import _ from 'lodash';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import React from "react";

class DashboardFilter {
  static Program = new DashboardFilter({param: "assessment_tool_mode", displayName: "Program", resourceName: "assessmentToolMode"});
  static AssessmentTool = new DashboardFilter({param: "assessment_tool", displayName: "Assessment Tool", dependentOn: DashboardFilter.Program, resourceName: "assessmentTool"});
  static AssessmentType = new DashboardFilter({param: "assessment_type", displayName: "Assessment Type", dependentOn: DashboardFilter.Program, resourceName: "assessmentType"});

  constructor({param, displayName, dependentOn, resourceName}) {
    this.param = param;
    this.displayName = displayName;
    this.dependentOn = dependentOn;
    this.resourceName = resourceName;
  }

  isIndependent() {
    return _.isNil(this.dependentOn);
  }

  getUrl(selectedFilterValues, stateId) {
    let urlSearchParams = new URLSearchParams();
    let baseUrl = `/api/${this.resourceName}/search/find`;
    urlSearchParams.append("state", stateId);
    if (!_.isNil(this.dependentOn)) {
      urlSearchParams.append(this.dependentOn.param, selectedFilterValues[this.dependentOn.param].id);
    }
    return baseUrl + "?" + urlSearchParams.toString();
  }

  isParentValueSelected(selectedFilterValues) {
    return _.isNil(this.dependentOn) || !_.isNil(selectedFilterValues[this.dependentOn.param]);
  }

  getParentValue(selectedFilterValues) {
    return selectedFilterValues[this.dependentOn.param];
  }
}

class Dashboard {
  constructor({id, name, filters = [DashboardFilter.Program, DashboardFilter.AssessmentTool, DashboardFilter.AssessmentType], height = '1000px', topLevel = true, boxData}) {
    this.id = id;
    this.type = "dashboard";
    this.name = name;
    this.filters = filters;
    this.height = height;
    this.topLevel = topLevel;
    this.boxData = boxData;
  };

  getIndependentFilters() {
    return _.filter(this.filters, (x) => x.isIndependent());
  }

  getDependentFilters() {
    return _.filter(this.filters, (x) => !x.isIndependent());
  }

  getDependentFiltersOn(filter) {
    return _.filter(this.filters, (x) => !_.isNil(x.dependentOn) && x.dependentOn.param === filter.param);
  }

  createMetabaseFilterObject(state, selectedFilterValues) {
    if (_.isNil(state)) return null;
    let params = {"state": state.name};
    this.filters.forEach(filter => {
      params[filter.param] = selectedFilterValues[filter.param].name;
    });
    return params;
  }
}

class DashboardBoxData {
  constructor(title, description, icon) {
    this.title = title;
    this.description = description;
    this.icon = icon;
  }
}

class MetabaseResources {
  constructor() {
    this.dashboards = [];

    let dashboardBoxData = new DashboardBoxData("ASSESSMENT DONE", "View assessments done in the state", <ImportExportIcon/>);
    this.defaultDashboard = new Dashboard({id: 2, name: "main", filters: [DashboardFilter.Program], boxData: dashboardBoxData});
    this.dashboards.push(this.defaultDashboard);

    this.dashboards.push(new Dashboard({id: 9, name: "assessmentList", topLevel: false}));

    dashboardBoxData = new DashboardBoxData("ASSESSMENT STATISTICS", "Average, median scores, etc - by department, standard, area of concern, and overall", <MoneyIcon/>);
    this.dashboards.push(new Dashboard({id: 5, name: "statistics", height: '2300px', boxData: dashboardBoxData}));

    dashboardBoxData = new DashboardBoxData("FACILITIES RANKING", "Facilities ranked across state by overall score", <ArrowUpwardIcon/>);
    this.dashboards.push(new Dashboard({id: 4, name: "facilitiesRanking", boxData: dashboardBoxData}));

    dashboardBoxData = new DashboardBoxData("EXPORT ASSESSMENT DATA", "View and download complete assessment", <CloudDownloadIcon/>);
    this.dashboards.push(new Dashboard({id: 6, name: "exportAssessments", boxData: dashboardBoxData}));
  }

  getResource(name) {
    return _.isEmpty(name) ? this.defaultDashboard : _.find(this.dashboards, (x) => x.name === name);
  }

  getTopLevelDashboards() {
    return _.filter(this.dashboards, (x) => x.topLevel);
  }

  isAllLoaded(metabaseResource, programs, assessmentTools, assessmentTypes) {
    let loaded = this._isAllLoaded(metabaseResource, programs, assessmentTools, assessmentTypes);
    console.log(loaded);
    return loaded;
  }

  getUniqueFilterParams() {
    return _.sortBy(_.reduce(this.dashboards, (result, dashboard) => _.union(result, dashboard.filters.map((filter) => filter.param)), []));
  }

  _isAllLoaded(metabaseResource, programs, assessmentTools, assessmentTypes) {
    if (_.isNil(programs)) return false;
    if (metabaseResource.hasAssessmentTool && _.isNil(assessmentTools)) return false;
    if (metabaseResource.hasAssessmentType && _.isNil(assessmentTypes)) return false;

    return true;
  }
}

export default new MetabaseResources();

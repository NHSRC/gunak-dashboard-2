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

  getUrl(stateId, selectedFilterValues) {
    let baseUrl;
    let urlSearchParams = new URLSearchParams();
    if (_.isNil(this.dependentOn)) {
      baseUrl = `/api/${this.resourceName}`;
    } else {
      baseUrl = `/api/${this.resourceName}/search/find`;
      urlSearchParams.append(this.dependentOn.param, selectedFilterValues[this.dependentOn.param]);
    }
    return baseUrl + urlSearchParams.toString();
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

  createFilterObject(state, selectedFilterValues) {
    if (_.isNil(state)) return null;
    let params = {"state": state.name};
    Object.keys(selectedFilterValues).forEach((filterParam) => {
      params[filterParam] = selectedFilterValues[filterParam].name;
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

  _isAllLoaded(metabaseResource, programs, assessmentTools, assessmentTypes) {
    if (_.isNil(programs)) return false;
    if (metabaseResource.hasAssessmentTool && _.isNil(assessmentTools)) return false;
    if (metabaseResource.hasAssessmentType && _.isNil(assessmentTypes)) return false;

    return true;
  }
}

export default new MetabaseResources();

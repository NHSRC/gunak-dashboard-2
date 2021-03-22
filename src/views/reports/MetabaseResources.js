import _ from 'lodash';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import React from "react";

const ParamDisplayNames = {
  assessment_tool: "Assessment Tool",
  assessment_tool_mode: "Program",
  assessment_type: "Assessment Type",
  assessment_id: "Assessment System Id",
  department: "Department",
  area_of_concern: "Area of concern",
};

export class DashboardFilter {
  static Program = new DashboardFilter({param: "assessment_tool_mode", resourceName: "assessmentToolMode"});
  static AssessmentTool = new DashboardFilter({
    param: "assessment_tool",
    dependentOn: DashboardFilter.Program,
    resourceName: "assessmentTool"
  });
  static AssessmentType = new DashboardFilter({
    param: "assessment_type",
    dependentOn: DashboardFilter.Program,
    resourceName: "assessmentType"
  });
  static AssessmentExport = new DashboardFilter({
    param: "assessment_id",
    singleValue: true
  });

  constructor({param, dependentOn, resourceName, singleValue = false}) {
    this.param = param;
    this.dependentOn = dependentOn;
    this.resourceName = resourceName;
    this.singleValue = singleValue;
  }

  isIndependent() {
    return _.isNil(this.dependentOn) && !this.singleValue;
  }

  isDependent() {
    return !_.isNil(this.dependentOn) && !this.singleValue;
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

  static getDisplayName(filter) {
    return ParamDisplayNames[filter.param];
  }
}

class Dashboard {
  constructor({id, name, filters = [DashboardFilter.Program, DashboardFilter.AssessmentTool, DashboardFilter.AssessmentType], height = '1000px', topLevel = true, boxData, independentOfState = false}) {
    this.id = id;
    this.type = "dashboard";
    this.name = name;
    this.filters = filters;
    this.height = height;
    this.topLevel = topLevel;
    this.boxData = boxData;
    this.independentOfState = independentOfState;
  };

  getIndependentFilters() {
    return _.filter(this.filters, (x) => x.isIndependent());
  }

  getDependentFilters() {
    return _.filter(this.filters, (x) => x.isDependent());
  }

  getDependentFiltersOn(filter) {
    return _.filter(this.filters, (x) => !_.isNil(x.dependentOn) && x.dependentOn.param === filter.param);
  }

  createMetabaseFilterObject(state, selectedFilterValues, searchString) {
    let params = {};
    if (!_.isNil(state) && !this.independentOfState)
      params["state"] = state.name;
    this.filters.forEach(filter => {
      if (!_.isNil(selectedFilterValues[filter.param]))
        params[filter.param] = selectedFilterValues[filter.param].name;
    });
    let urlSearchParams = new URLSearchParams(searchString);
    urlSearchParams.forEach((value, key) => {
      if (key !== "name")
        params[key] = value;
    });
    return params;
  }

  getDisplayLabels(searchString) {
    let labels = [];
    let urlSearchParams = new URLSearchParams(searchString);
    urlSearchParams.forEach((value, key) => {
      if (ParamDisplayNames[key])
        labels.push(`${ParamDisplayNames[key]}: ${value}`);
    });
    return labels;
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

    let dashboardBoxData = new DashboardBoxData("ASSESSMENT DONE", "Count of assessments done in the state", <ImportExportIcon/>);
    this.defaultDashboard = new Dashboard({id: 2, name: "main", filters: [DashboardFilter.Program], boxData: dashboardBoxData});
    this.dashboards.push(this.defaultDashboard);

    this.dashboards.push(new Dashboard({id: 7, name: "assessmentList", topLevel: false, filters: []}));
    this.dashboards.push(new Dashboard({id: 9, name: "departmentalScoreComparison", topLevel: false, filters: []}));
    this.dashboards.push(new Dashboard({id: 10, name: "aocScoreComparison", topLevel: false, filters: []}));

    dashboardBoxData = new DashboardBoxData("ASSESSMENT STATISTICS", "Average, median scores, etc - by department, standard, area of concern, and overall", <MoneyIcon/>);
    this.dashboards.push(new Dashboard({id: 5, name: "statistics", height: '2300px', boxData: dashboardBoxData}));

    dashboardBoxData = new DashboardBoxData("FACILITIES RANKING", "Facilities ranked across state by overall score", <ArrowUpwardIcon/>);
    this.dashboards.push(new Dashboard({id: 4, name: "facilitiesRanking", boxData: dashboardBoxData}));

    this.dashboards.push(new Dashboard({id: 6, name: "exportAssessment", filters: [DashboardFilter.AssessmentExport], topLevel: false, independentOfState: true}));

    dashboardBoxData = new DashboardBoxData("FILTER/EXPORT ASSESSMENTS", "Find and download complete assessment", <CloudDownloadIcon/>);
    this.dashboards.push(new Dashboard({id: 7, name: "filterAssessments", boxData: dashboardBoxData}));

  }

  getResource(name) {
    return _.isEmpty(name) ? this.defaultDashboard : _.find(this.dashboards, (x) => x.name === name);
  }

  getTopLevelDashboards() {
    return _.filter(this.dashboards, (x) => x.topLevel);
  }

  isAllLoaded(metabaseResource, programs, assessmentTools, assessmentTypes) {
    return this._isAllLoaded(metabaseResource, programs, assessmentTools, assessmentTypes);
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

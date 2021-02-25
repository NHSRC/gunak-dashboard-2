import _ from 'lodash';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import React from "react";

class Dashboard {
  constructor({id, name, hasAssessmentTool = true, hasAssessmentType = true, height = '1000px', topLevel = true, boxData}) {
    this.id = id;
    this.type = "dashboard";
    this.name = name;
    this.hasAssessmentTool = hasAssessmentTool;
    this.hasAssessmentType = hasAssessmentType;
    this.height = height;
    this.topLevel = topLevel;
    this.boxData = boxData;
  };
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
    this.defaultDashboard = new Dashboard({id: 2, name: "main", hasAssessmentTool: false, hasAssessmentType: false, boxData: dashboardBoxData});
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

  createFilterObject(metabaseResource, state, assessmentToolMode, assessmentTool, assessmentType) {
    if (_.isNil(state) || _.isNil(assessmentToolMode)) return null;
    if (metabaseResource.hasAssessmentTool && _.isNil(assessmentTool)) return null;
    if (metabaseResource.hasAssessmentType && _.isNil(assessmentType)) return null;

    let params = {"state": state.name, "assessment_tool_mode": assessmentToolMode.name};
    if (metabaseResource.hasAssessmentTool) params["assessment_tool"] = assessmentTool.name;
    if (metabaseResource.hasAssessmentType) params["assessment_type"] = assessmentType.name;
    return params;
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

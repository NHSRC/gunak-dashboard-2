import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Container, Grid, makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import DashboardBox from './DashboardBox';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import MetabaseDashboardService from "../../../service/MetabaseDashboardService";
import DashboardState from "../DashboardState";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import DataReadService from "../../../service/DataReadService";
import MetabaseDashboards from "../MetabaseDashboards";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  let searchString = useLocation().search.substring(1);
  const [componentState, update] = useState(DashboardState.newInstance(searchString));
  // program, assessment_tool, assessment_type
  useEffect(() => {
    DataReadService.getState().then((state) => {
      componentState.state = state;
      MetabaseDashboardService.getDashboardIframeUrl(state, componentState.dashboardId, searchString).then((data) => {
        componentState.mainDashboardUrl = data;
        update(DashboardState.clone(componentState));
      }).catch((error) => {
        componentState.error = error;
        update(DashboardState.clone(componentState));
      })
    });
  }, [componentState.dashboardId]);

  const switchToDashboard = function (dashboardId) {
    componentState.dashboardId = dashboardId;
    update(DashboardState.clone(componentState));
  };

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <DashboardBox title="ASSESSMENT DONE" description="Assessment done in the state" icon={<ImportExportIcon/>}
                        linkedDashboard={MetabaseDashboards.Main} clickFn={switchToDashboard} isCurrent={MetabaseDashboards.Main === componentState.dashboardId}/>
          <DashboardBox title="ASSESSMENT STATISTICS" description="Average, median scores, etc - by department, standard, area of concern, and overall"
                        icon={<MoneyIcon/>} linkedDashboard={MetabaseDashboards.Statistics} clickFn={switchToDashboard}
                        isCurrent={MetabaseDashboards.Statistics === componentState.dashboardId}/>
          <DashboardBox title="FACILITIES RANKING" description="Facilities ranked across state" icon={<ArrowUpwardIcon/>}
                        linkedDashboard={MetabaseDashboards.FacilitiesRanking} clickFn={switchToDashboard}
                        isCurrent={MetabaseDashboards.FacilitiesRanking === componentState.dashboardId}/>
          <DashboardBox title="EXPORT ASSESSMENT DATA" description="View and download complete assessment" icon={<CloudDownloadIcon/>}
                        linkedDashboard={MetabaseDashboards.ExportAssessments} clickFn={switchToDashboard}
                        isCurrent={MetabaseDashboards.ExportAssessments === componentState.dashboardId}/>
          {/*<Grid item lg={8} md={12} xl={9} xs={12}>*/}
          {/*</Grid>*/}
        </Grid>
        <br/>
        {componentState.mainDashboardUrl ?
          <iframe src={componentState.mainDashboardUrl} title='Metabase' style={{border: 'none', width: '100%', height: '1000px'}}/>
          : <CircularProgress/>}
      </Container>
    </Page>
  );
};

export default Dashboard;

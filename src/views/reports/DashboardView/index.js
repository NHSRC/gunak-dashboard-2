import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Container, Grid, makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import DashboardBox from './DashboardBox';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DashboardState from "../DashboardState";
import MetabaseResources from "../MetabaseResources";
import FiltersAndReports from "./FiltersAndReports";

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

  const switchToDashboard = function (resource) {
    componentState.resource = resource;
    update(DashboardState.clone(componentState));
  };

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <DashboardBox title="ASSESSMENT DONE" description="View assessments done in the state" icon={<ImportExportIcon/>}
                        clickFn={switchToDashboard} isCurrent={MetabaseResources.Main.id === componentState.resource.id}/>
          <DashboardBox title="ASSESSMENT STATISTICS" description="Average, median scores, etc - by department, standard, area of concern, and overall"
                        icon={<MoneyIcon/>} clickFn={() => switchToDashboard(MetabaseResources.Statistics)}
                        isCurrent={MetabaseResources.Statistics.id === componentState.resource.id}/>
          <DashboardBox title="FACILITIES RANKING" description="Facilities ranked across state by overall score" icon={<ArrowUpwardIcon/>}
                        clickFn={() => switchToDashboard(MetabaseResources.FacilitiesRanking)}
                        isCurrent={MetabaseResources.FacilitiesRanking.id === componentState.resource.id}/>
          <DashboardBox title="EXPORT ASSESSMENT DATA" description="View and download complete assessment" icon={<CloudDownloadIcon/>}
                        clickFn={() => switchToDashboard(MetabaseResources.ExportAssessments)}
                        isCurrent={MetabaseResources.ExportAssessments.id === componentState.resource.id}/>
        </Grid>
        <br/>
        <FiltersAndReports metabaseResource={componentState.resource} assessmentToolEnabled={false}/>
      </Container>
    </Page>
  );
};

export default Dashboard;

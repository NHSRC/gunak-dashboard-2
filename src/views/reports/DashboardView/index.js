import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Grid, makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import DashboardBox from './DashboardBox';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import MetabaseDashboardService from "../../../service/MetabaseDashboardService";
import DashboardState from "../../../state/DashboardState";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import LoginService from "../../../service/LoginService";
import DataReadService from "../../../service/DataReadService";

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

  const [componentState, update] = useState(DashboardState.newInstance());
  // program, assessment_tool, assessment_type
  const queryParams = useParams();

  useEffect(() => {
    DataReadService.getState().then((state) => {
      MetabaseDashboardService.getMainDashboardIframeUrl(state, queryParams).then((data) => {
        componentState.mainDashboardUrl = data;
        update(DashboardState.clone(componentState));
      }).catch((error) => {
        componentState.error = error;
        update(DashboardState.clone(componentState));
      })
    });
  }, []);

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <DashboardBox title="MEDIAN SCORE" description="By - department, standard, area of concern, and overall" icon={<MoneyIcon/>}/>
          <DashboardBox title="FACILITIES RANKING" description="Lorem ipsomosm aunamo anhkamos omsh" icon={<ArrowUpwardIcon/>}/>
          <DashboardBox title="EXPORT ASSESSMENT DATA" description="View and download complete assessment" icon={<CloudDownloadIcon/>}/>
          <DashboardBox title="BEST AND WORST AREAS" description="Check by departments and area of concern" icon={<ImportExportIcon/>}/>
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

import React from 'react';
import {
  Container,
  Grid,
  makeStyles, Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import DashboardBox from './DashboardBox';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ImportExportIcon from '@material-ui/icons/ImportExport';

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

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <DashboardBox title="MEDIAN SCORE" description="By - department, standard, area of concern, and overall" icon={<MoneyIcon/>}/>
          <DashboardBox title="FACILITIES RANKING" description="Lorem ipsomosm aunamo anhkamos omsh" icon={<ArrowUpwardIcon/>}/>
          <DashboardBox title="EXPORT ASSESSMENT DATA" description="View and download complete assessment" icon={<CloudDownloadIcon/>}/>
          <DashboardBox title="BEST AND WORST AREAS" description="Check by departments and area of concern" icon={<ImportExportIcon/>}/>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts/>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;

import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Container, Grid, makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import DashboardBox from './DashboardBox';
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

  let paramsString = useLocation().search;
  const [componentState, update] = useState(DashboardState.newInstance(paramsString));

  const switchToResource = function (resource) {
    componentState.resource = resource;
    update(DashboardState.clone(componentState));
  };

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {MetabaseResources.getTopLevelDashboards().map((x) =>
            <DashboardBox title={x.boxData.title} description={x.boxData.description} icon={x.boxData.icon} key={x.name}
                          clickFn={() => switchToResource(x)} isCurrent={x.name === componentState.resource.name}/>
          )}
        </Grid>
        <br/>
        <br/>
        <br/>
        <FiltersAndReports metabaseResource={componentState.resource}/>
      </Container>
    </Page>
  );
};

export default Dashboard;

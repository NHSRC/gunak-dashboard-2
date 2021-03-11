import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Container, Grid, makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import DashboardBox from './DashboardBox';
import DashboardState from "../DashboardState";
import MetabaseResources from "../MetabaseResources";
import FiltersAndReports from "./FiltersAndReports";
import DataReadService from "../../../service/DataReadService";
import ApiResponse from "../../../model/ApiResponse";
import FiltersAndReportsState from "../FiltersAndReportsState";

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

  useEffect(() => {
    DashboardState.update(componentState, paramsString);
    update(DashboardState.clone(componentState));
  }, [paramsString]);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {MetabaseResources.getTopLevelDashboards().map((x) =>
            <DashboardBox title={x.boxData.title} description={x.boxData.description} icon={x.boxData.icon} key={x.name}
                          isCurrent={x.name === componentState.resource.name} searchParams={`name=${x.name}`}/>
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

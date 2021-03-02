import React from 'react';
import {Container, Grid, makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import LoginService from "../../../service/LoginService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();

  let user = LoginService.getUser();
  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            md={6}
            xs={12}
          >
            <Profile user={user}/>
          </Grid>
          <Grid
            item
            lg={9}
            md={6}
            xs={12}
          >
            <ProfileDetails user={user}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import TopBar from './TopBar';
import LoginService from "../../service/LoginService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 0
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const DashboardLayout = ({children}) => {
  const classes = useStyles();

  const componentDidUpdate = function(prevProps, prevState) {
    console.log("componentDidUpdate");
  };

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => {}} user={LoginService.getUser()}/>
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

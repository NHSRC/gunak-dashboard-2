import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  Link,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const DashboardBox = ({className, title, icon, description, linkedDashboard, clickFn, isCurrent, ...rest}) => {
  const classes = useStyles();

  return (
    <Grid item lg={3} sm={6} xl={3} xs={12}>
      <Card
        className={clsx(classes.root, className)}
        style={{backgroundColor: isCurrent ? 'lightblue' : 'white'}}
        {...rest}
      >
        <CardContent>
          <Grid
            container
            justify="space-between"
            spacing={3}
          >
            <Grid item>
              <Avatar className={classes.avatar}>
                {icon}
              </Avatar>
            </Grid>
            <Grid item>
              <Link
                component="button"
                color="textSecondary"
                gutterBottom
                variant="h6"
                underline="always"
                onClick={() => clickFn()}
              >{title}</Link>
              <Typography
                color="textPrimary"
                variant="h5">{description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

DashboardBox.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  linkedDashboard: PropTypes.number.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  clickFn: PropTypes.func.isRequired
};

export default DashboardBox;

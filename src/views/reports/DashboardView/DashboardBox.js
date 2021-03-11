import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Avatar, Card, CardContent, colors, Grid, Link, makeStyles, Typography} from '@material-ui/core';
import RRDLink from "react-router-dom/Link";

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

const DashboardBox = ({className, title, icon, description, isCurrent, searchParams, ...rest}) => {
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
              ><RRDLink to={`/app/dashboard?${searchParams}`}>{title}</RRDLink></Link>
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
  isCurrent: PropTypes.bool.isRequired,
  searchParams: PropTypes.string.isRequired
};

export default DashboardBox;

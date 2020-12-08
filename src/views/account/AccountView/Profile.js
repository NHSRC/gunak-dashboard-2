import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Avatar, Box, Card, CardContent, Divider, makeStyles, Typography} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, user, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={null}
          />
          <br/>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.getFullName()}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default Profile;

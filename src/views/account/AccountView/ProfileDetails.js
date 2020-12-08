import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import DataReadService from "../../../service/DataReadService";
import ProfileState from "../ProfileState";
import User from "../../../model/User";


const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, user, ...rest }) => {
  const classes = useStyles();
  const [profileState, update] = useState(ProfileState.newInstance(user));

  useEffect(() => {
    DataReadService.getState().then((state) => {
      profileState.state = state;
      update(ProfileState.clone(profileState));
    });
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Your profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={User.getFirstName(profileState.user)}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={User.getLastName(profileState.user)}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={User.getEmail(profileState.user)}
                variant="outlined"
              />
            </Grid>
            {profileState.state && <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                disabled={true}
                required
                select
                SelectProps={{native: true}}
                value={profileState.state.name}
                variant="outlined"
              >
                {[<option key={profileState.state.name} value={profileState.state.name}>
                  {profileState.state.name}
                </option>]}
              </TextField>
            </Grid>}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;

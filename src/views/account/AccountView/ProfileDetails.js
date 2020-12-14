import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, makeStyles, TextField} from '@material-ui/core';
import DataReadService from "../../../service/DataReadService";
import ProfileState from "../ProfileState";
import User from "../../../model/User";
import UserProfileService from "../../../service/UserProfileService";
import ApiCallView from "../../ApiCallView";

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({className, user, ...rest}) => {
  const classes = useStyles();
  const [profileState, update] = useState(ProfileState.newInstance(user));

  useEffect(() => {
    DataReadService.getState().then((apiResponse) => {
      profileState.apiResponse = apiResponse;
      console.log(profileState);
      update(ProfileState.clone(profileState));
    });
  }, []);

  const handleChange = (event) => {
    User.updateField(profileState.user, event.target.name, event.target.value);
    update(ProfileState.clone(profileState));
  };

  let view = ApiCallView.handleApiCall(profileState.apiResponse);
  if (!_.isNil(view)) return view;

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
        <Divider/>
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
            {<Grid
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
                value={profileState.apiResponse.data.name}
                variant="outlined"
              >
                {[<option key={profileState.apiResponse.data.name} value={profileState.apiResponse.data.name}>
                  {profileState.apiResponse.data.name}
                </option>]}
              </TextField>
            </Grid>}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                id="oldPassword"
                label="Old Password"
                type="password"
                autoComplete="off"
                onChange={(event) => {
                  profileState.oldPassword = event.target.value;
                  update(ProfileState.clone(profileState));
                }}
                value={profileState.oldPassword}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                id="newPassword"
                label="New Password"
                type="password"
                autoComplete="new-password"
                onChange={(event) => {
                  profileState.newPassword = event.target.value;
                  update(ProfileState.clone(profileState));
                }}
                value={profileState.newPassword}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider/>
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button color="primary" variant="contained" onClick={() => {
            UserProfileService.saveProfile(profileState.user, profileState.oldPassword, profileState.newPassword).then((user) => {
              profileState.user = user;
              update(profileState);
            });
          }}>Save details</Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;

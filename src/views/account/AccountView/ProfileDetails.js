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
import UserProfileService from "../../../service/UserProfileService";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {Redirect} from "react-router-dom";
import ApiResponse from "../../../model/ApiResponse";
import ErrorView from "../../errors/ErrorView";

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({className, user, ...rest}) => {
  const classes = useStyles();
  const [profileState, update] = useState(ProfileState.newInstance(user));

  useEffect(() => {
    DataReadService.getState().then((apiResponse) => {
      profileState.state = apiResponse.data;
      profileState.apiResponse = apiResponse;
      update(ProfileState.clone(profileState));
    });
  }, []);

  const handleChange = (event) => {
    User.updateField(profileState.user, event.target.name, event.target.value);
    update(ProfileState.clone(profileState));
  };

  if (_.isNil(profileState.apiResponse)) {
    return <CircularProgress/>;
  } else if (ApiResponse.hasError(profileState.apiResponse)) {
    return <ErrorView pageTitle="Error during profile load" messageTitle={ApiResponse.getHumanError(profileState.apiResponse)}
                      message={ApiResponse.getErrorResponse(profileState.apiResponse)}/>;
  }

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
                value={profileState.state.name}
                variant="outlined"
              >
                {[<option key={profileState.state.name} value={profileState.state.name}>
                  {profileState.state.name}
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

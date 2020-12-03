import _ from 'lodash';
import React, {useEffect, useState} from "react";
import {Link as RouterLink, Redirect} from 'react-router-dom';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import LoginService from "../../service/LoginService";
import LoginState from "../../state/LoginState";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const [loginState, update] = useState(LoginState.newInstance());

  if (loginState.loginStatus === LoginState.LOGIN_STATUS_SUCCESS) {
    return <Redirect to="/"/>
  }

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{}}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values, {setSubmitting}) => {
              LoginService.login(values.email, values.password, () => {
                LoginState.loginSucceeded(loginState);
                update(LoginState.clone(loginState));
              }, (error) => {
                LoginState.loginFailed(loginState, error);
                setSubmitting(false);
                update(LoginState.clone(loginState));
              });
            }}
          >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={_.isNil(values.email) ? '' : values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={_.isNil(values.password) ? '' : values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Box mb={3}>
                  {loginState.loginStatus === LoginState.LOGIN_STATUS_FAILED && <Typography color="error" variant="h3" display="block" align="center">
                    {loginState.errorMessage}
                  </Typography>}
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{' '}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;

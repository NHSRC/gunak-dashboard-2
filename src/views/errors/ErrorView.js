import React from 'react';
import {Box, Container, makeStyles, Typography} from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const ErrorView = ({pageTitle, messageTitle, message}) => {
  const classes = useStyles();

  return (
    <div>
      <Page
        className={classes.root}
        title={pageTitle}
      >
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="md">
            <Typography
              align="center"
              color="textPrimary"
              variant="h3"
            >
              {messageTitle}
            </Typography>
            <br/>
            <Typography
              align="center"
              color="textPrimary"
              variant="h4"
            >
              {message}
            </Typography>
          </Container>
        </Box>
      </Page>
    </div>
  );
};

ErrorView.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  messageTitle: PropTypes.string,
  message: PropTypes.string
};

export default ErrorView;

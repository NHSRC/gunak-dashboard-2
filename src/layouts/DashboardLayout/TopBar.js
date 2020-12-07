import React, {useState} from 'react';
import {Link as RouterLink, Redirect} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {AppBar, Box, Hidden, IconButton, makeStyles, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import LoginService from "../../service/LoginService";
import LoginState from "../../state/LoginState";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();

  const [state, update] = useState(LoginService.isLoggedIn);
  if (!state) {
    return <Redirect to="/"/>
  }

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Typography
          color="white"
          variant="h2">Gunak Dashboard</Typography>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <InputIcon onClick={() => {
              LoginService.logout();
              update(false);
            }}/>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;

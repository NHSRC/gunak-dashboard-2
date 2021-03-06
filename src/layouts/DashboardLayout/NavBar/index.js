import React, {useEffect} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Avatar, Box, Divider, Drawer, Hidden, List, makeStyles, Typography} from '@material-ui/core';
import {BarChart as BarChartIcon, User as UserIcon} from 'react-feather';
import NavItem from './NavItem';

const items = [
  {
    href: '/dashboard',
    icon: BarChartIcon,
    title: 'NQAS'
  },
  {
    href: '/dashboard/account',
    icon: UserIcon,
    title: 'Account'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 200,
    top: 77,
    height: 'calc(100% - 77px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({onMobileClose, openMobile, user}) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={null}
          to="/dashboard/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5">
          {user.getFullName()}
        </Typography>
      </Box>
      <Divider/>
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1}/>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{paper: classes.mobileDrawer}}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{paper: classes.desktopDrawer}}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default NavBar;

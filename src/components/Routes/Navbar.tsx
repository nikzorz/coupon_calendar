import React from 'react';
import {
  AppBar,
  Badge,
  Button,
  createStyles,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
  Link
} from "@material-ui/core";
import { Link as RouterLink, NavLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import {AccountCircle, Notifications as NotificationsIcon} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "../../hooks/auth/use-auth";

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  navLink: {
    paddingRight: '14px',
    '&.active': {
      textDecoration: 'underline'
    }
  },
  title: {
    paddingRight: '20px',
  },
  rightSection: {
    display: 'flex',
  }
}))

export const Navbar: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const auth = useAuth();

  // do not render the navbar if the user is not logged in
  if (!auth.authUser) {
    return (
      <div />
    );
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const profileMenuId = 'primary-account-menu';

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            noWrap
          >
            OIT
          </Typography>
          <Link
            className={classes.navLink}
            color="inherit"
            variant="button"
            component={NavLink}
            to="/"
            exact
          >
            Calendar
          </Link>
          <Link
            className={classes.navLink}
            color="inherit"
            variant="button"
            component={NavLink}
            to="/offers"
          >
            Offer Library
          </Link>
          <Link
            className={classes.navLink}
            color="inherit"
            variant="button"
            component={NavLink}
            to="/schedules"
          >
            Schedules
          </Link>
          <Link
            className={classes.navLink}
            color="inherit"
            variant="button"
            component={NavLink}
            to="/alerts"
          >
            Alerts
          </Link>
          <Link
            className={classes.navLink}
            color="inherit"
            variant="button"
            component={NavLink}
            to="/users"
          >
            User Management
          </Link>
          <div className={classes.grow} />
          <div className={classes.rightSection}>
            <IconButton
              aria-label="show 4 new notifications"
              color="inherit"
            >
              <Badge
                badgeContent={4}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        id={profileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={isMenuOpen}
        onClose={handleProfileMenuClose}
      >
        <MenuItem
          component={RouterLink}
          onClick={handleProfileMenuClose}
          to="/changepassword"
        >
          Change Password
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            auth.logout();
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </div>
  )
}
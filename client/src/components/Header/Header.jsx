import React from 'react';
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../context/GlobalState';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '20px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  const { token, userLogout } = useStateValue();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    userLogout();
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className="navlink">
              <strong>MY BLOG</strong>
            </NavLink>
          </Typography>
          <Button color="inherit">
            <NavLink to="/" className="navlink">
              <strong>Blogs</strong>
            </NavLink>
          </Button>
          {token ? (
            <Button color="inherit">
              <NavLink to="/myarticles" className="navlink">
                <strong> My Articles</strong>
              </NavLink>
            </Button>
          ) : null}
          {token ? (
            <Button color="inherit">
              <NavLink to="/add" className="navlink">
                <strong> Add Article</strong>
              </NavLink>
            </Button>
          ) : null}
          <Button color="inherit">
            {!token ? (
              <NavLink to="/login" className="navlink">
                <strong>Login</strong>
              </NavLink>
            ) : (
              <NavLink to="/login" onClick={logout} className="navlink">
                <strong>Logout</strong>
              </NavLink>
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;

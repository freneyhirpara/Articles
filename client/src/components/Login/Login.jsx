/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginQuery } from '../../queries/queries';
import { useStateValue } from '../../context/GlobalState';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'rgb(34, 54, 54)',
    color: 'white',
  },
}));

function Login({ history }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const { userLogin, setError, resetError } = useStateValue();
  const [login] = useMutation(loginQuery);

  const handleSubmit = async (e) => {
    resetError();
    e.preventDefault();
    await login({
      variables: {
        email: userName,
        password,
      },
    })
      .then(async (res) => {
        if (res.data.login.status === 'SUCCESS') {
          const { token, userId } = res.data.login.data;
          await localStorage.setItem('token', token);
          await localStorage.setItem('userId', userId);
          userLogin({
            token,
            userId,
          });
          history.push('/');
        } else {
          throw new Error(res.data.login.error);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
    setUserName('');
    setPassword('');
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="password"
                name="lastName"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            LOGIN
          </Button>
          <center>
            <p>
              Don&apos;t have an Account?
              <Link to="/register" className="readmore">
                Register
              </Link>
            </p>
          </center>
        </form>
      </div>
    </Container>
  );
}

export default Login;

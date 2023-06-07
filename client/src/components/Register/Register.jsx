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
import { addUserQuery } from '../../queries/queries';
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

function Register({ history }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profession, setProfession] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setError, resetError } = useStateValue();

  const [createUser] = useMutation(addUserQuery);
  const handleSubmit = async (e) => {
    resetError();
    e.preventDefault();
    await createUser({
      variables: {
        firstName,
        lastName,
        profession,
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.createUser.status === 'SUCCESS') {
          history.push('/login');
        } else {
          throw new Error(res.data.createUser.error);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setProfession('');
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="authorlastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="profession"
                label="Profession"
                name="profession"
                autoComplete="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
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
            REGISTER
          </Button>
          <center>
            <p>
              Already have an Account?
              <Link to="/login" className="readmore">
                Login
              </Link>
            </p>
          </center>
        </form>
      </div>
    </Container>
  );
}

export default Register;

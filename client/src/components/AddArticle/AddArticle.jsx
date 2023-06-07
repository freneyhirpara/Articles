/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { addArticlesQuery, getArticlesByCategoryQuery } from '../../queries/queries';
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

function AddArticle({ history }) {
  const classes = useStyles();
  const {
    token, setError, resetError, getAllArticles, sortByCategory,
  } = useStateValue();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();
  const [createArticle] = useMutation(addArticlesQuery);
  const { loading, data, refetch } = useQuery(getArticlesByCategoryQuery, {
    variables: {
      category: sortByCategory,
      page: 1,
      limit: 3,
    },
  });

  useEffect(() => {
    if (data && loading === false) {
      getAllArticles(data.getArticlesByCategory.data);
    }
    return () => null;
  }, [data, loading]);

  const handleSubmit = (e) => {
    resetError();
    e.preventDefault();
    const article = {
      name,
      category,
      description,
    };
    createArticle({
      variables: article,
    })
      .then((res) => {
        if (res.data.createArticle.status === 'SUCCESS') {
          const fd = new FormData();
          fd.append('articleId', res.data.createArticle.data._id);
          fd.append('file', image);
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          axios
            .post('http://localhost:8080/image/upload', fd, {
              headers,
            })
            .then(async () => {
              await refetch();
              history.push('/');
            })
            .catch((err) => {
              throw new Error(err.message);
            });
        } else {
          throw new Error(res.data.createArticle.error);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
    setName('');
    setCategory('');
    setDescription('');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Article Title"
                name="title"
                autoComplete="title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="outlined-select-currency-native"
                select
                fullWidth
                required
                label="Category of Article"
                className="textField"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
              >
                <option>Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Research">Research</option>
                <option value="Gaming">Gaming</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food">Food</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                required
                fullWidth
                margin="normal"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  name="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            POST
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default AddArticle;

/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  editArticlesQuery,
  getArticlesByCategoryQuery,
  getArticleByIdQuery,
} from '../../queries/queries';
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

function EditArticle({ history }) {
  const classes = useStyles();
  const {
    token,
    setError,
    resetError,
    getAllArticles,
    sortByCategory,
    article,
    getArticleById,
  } = useStateValue();
  console.log(article);
  const [name, setName] = useState(article?.articleName);
  const [category, setCategory] = useState(article?.category);
  const [description, setDescription] = useState(article?.description);
  const [image, setImage] = useState(article?.image);
  const [editArticle] = useMutation(editArticlesQuery);
  const { id } = useParams();
  console.log(id);
  const { loading: getByIdLoading, data: getByIdData } = useQuery(
    getArticleByIdQuery,
    {
      variables: { id },
    },
  );
  const { loading, data, refetch } = useQuery(getArticlesByCategoryQuery, {
    variables: {
      category: sortByCategory,
      page: 1,
      limit: 3,
    },
  });
  useEffect(() => {
    setName(article.articleName);
    setCategory(article.category);
    setDescription(article.description);
    setImage(article.image);
  }, [article]);

  useEffect(() => {
    try {
      if (getByIdLoading === false && getByIdData !== undefined) {
        resetError();
        if (getByIdData.getArticle.status === 'SUCCESS') {
          getArticleById(getByIdData.getArticle.data);
        } else {
          throw new Error(getByIdData.getArticle.error);
        }
      }
    } catch (error) {
      setError(error.message);
      history.push('/');
    }
  }, [getByIdLoading, getByIdData]);
  useEffect(() => {
    if (data && loading === false) {
      getAllArticles(data.getArticlesByCategory.data);
    }
    return () => null;
  }, [data, loading]);

  const handleSubmit = (e) => {
    resetError();
    e.preventDefault();
    const updatedArticle = {
      articleId: id,
      name,
      category,
      description,
    };
    editArticle({
      variables: updatedArticle,
    })
      .then(async (res) => {
        if (res.data.editArticle.status === 'SUCCESS') {
          if (res.data.editArticle.data.image !== image) {
            const fd = new FormData();
            fd.append('articleId', res.data.editArticle.data._id);
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
            await refetch();
            history.push('/');
          }
        } else {
          throw new Error(res.data.editArticle.error);
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

export default EditArticle;

/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { getArticleByIdQuery, addCommentQuery } from '../../queries/queries';
import { useStateValue } from '../../context/GlobalState';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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

function ArticleComments({ articleId }) {
  const classes = useStyles();
  const [addComment] = useMutation(addCommentQuery);
  const [comment, setComment] = useState('');
  const { article } = useStateValue();
  const submitForm = (e) => {
    e.preventDefault();
    addComment({
      variables: {
        body: comment,
        articleId,
      },
      refetchQueries: [
        { query: getArticleByIdQuery, variables: { id: articleId } },
      ],
    });
    setComment('');
  };

  return (
    <div>
      <form className={classes.form} onSubmit={submitForm}>
        <TextField
          id="outlined-multiline-static"
          label="Comment Here"
          multiline
          autoFocus
          margin="normal"
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
        />
        <Button type="submit" variant="contained" className={classes.submit}>
          Post
        </Button>
      </form>
      <hr />

      <hr />
      <h4>Comments</h4>
      {article?.comments?.length ? (
        article.comments.map((articleComment) => (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" spacing={0}>
                <Grid item>
                  <Avatar>{articleComment.user.firstName[0]}</Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">{`${articleComment.user.firstName} ${articleComment.user.lastName}`}</Typography>
                  <Typography>{articleComment.body}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))
      ) : (
        <p>no comments</p>
      )}
    </div>
  );
}

export default ArticleComments;

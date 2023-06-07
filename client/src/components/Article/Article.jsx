/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import ShareIcon from '@material-ui/icons/Share';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';
import LikeButton from './Buttons/LikeButton';
import './Article.css';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 745,
  },
  media: {
    height: '150px',
    width: '150px',
  },
  avatar: {
    backgroundColor: '#cdd0c7',
  },
}));

function Article({
  id, title, likes, description, authorName, image,
}) {
  const classes = useStyles();
  return (
    <div className="article">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            (
              <Avatar aria-label="recipe" className={classes.avatar}>
                {authorName.substring(0, 1).toUpperCase()}
              </Avatar>
            )
          }
          title={title}
          subheader={authorName}
        />
        <div className="article__Body">
          <div className="article__Content">
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {description.substring(0, 350)}
                ...
                <NavLink to={`/article/${id}`} className="readmore">
                  Read More
                </NavLink>
              </Typography>
            </CardContent>
          </div>
          <div className="article__Media">
            <CardMedia
              className={classes.media}
              image={`http://localhost:8080/images/${image}`}
              title="Paella dish"
            />
          </div>
        </div>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <LikeButton articleId={id} articleLikes={likes} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default Article;

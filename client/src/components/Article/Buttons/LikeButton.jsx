/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useStateValue } from '../../../context/GlobalState';
import { toggleLikeQuery, getArticlesQuery } from '../../../queries/queries';

function LikeButton({ articleLikes, articleId }) {
  const { userId, setError, resetError } = useStateValue();
  const [liked, setLiked] = useState(false);

  const [toggleLikes] = useMutation(toggleLikeQuery);

  useEffect(() => {
    if (userId && articleLikes.find((like) => like._id === userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [articleLikes]);

  const handleLikes = () => {
    try {
      if (userId) {
        resetError();
        toggleLikes({
          variables: {
            articleId,
          },
          refetchQueries: [
            {
              query: getArticlesQuery,
            },
          ],
        });
      } else {
        throw new Error('Login to like Articles.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="likes">
      {liked ? (
        <FavoriteIcon className="likes__FavIcon" onClick={handleLikes} />
      ) : (
        <FavoriteBorderIcon onClick={handleLikes} />
      )}
      <p className="likes__Count">{articleLikes?.length}</p>
    </div>
  );
}

export default LikeButton;

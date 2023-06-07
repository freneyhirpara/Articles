/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { getArticleByIdQuery } from '../../queries/queries';
import { useStateValue } from '../../context/GlobalState';
import ArticleComments from './ArticleComments';

function ArticleDetails({ history }) {
  const { id } = useParams();
  const { loading, data } = useQuery(getArticleByIdQuery, {
    variables: { id },
  });
  const {
    getArticleById, article, setError, resetError,
  } = useStateValue();
  useEffect(() => {
    try {
      if (loading === false && data !== undefined) {
        resetError();
        if (data.getArticle.status === 'SUCCESS') {
          getArticleById(data.getArticle.data);
        } else {
          throw new Error(data.getArticle.error);
        }
      }
    } catch (error) {
      setError(error.message);
      history.push('/login');
    }
  }, [loading, data]);
  const displayArticleDetails = () => {
    if (loading === true) {
      return <div>Loading Articles</div>;
    }
    return (
      <div>
        <h2>{article?.articleName}</h2>
        <p>{`Category - ${article?.category}`}</p>
        <p>
          {article
          && `By - ${article?.author?.firstName} ${article?.author?.lastName}, ${article?.author?.profession}`}
        </p>
        <hr />
        <p>{article?.description}</p>
      </div>
    );
  };

  return (
    <div id="article-details">
      {displayArticleDetails()}
      <div>
        <ArticleComments
          comments={article?.comments}
          articleId={article?._id}
        />
      </div>
    </div>
  );
}

export default ArticleDetails;

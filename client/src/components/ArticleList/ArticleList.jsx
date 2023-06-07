/* eslint-disable react/prop-types */
/* eslint-disable-line prefer-template */
/* eslint-disable-next-line react-hooks/exhaustive-deps */
/* eslint no-underscore-dangle: 0 */

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { getArticlesByCategoryQuery } from '../../queries/queries';
import { useStateValue } from '../../context/GlobalState';
import Article from '../Article/Article';
import Pagination from '../Pagination/Pagination';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function ArticleList() {
  const classes = useStyles();
  const {
    getAllArticles, articles, sortByCategory, resetError,
  } = useStateValue();

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  const { data, loading } = useQuery(getArticlesByCategoryQuery, {
    variables: {
      category: sortByCategory,
      page: currentPage,
      limit: articlesPerPage,
    },
  });
  const paginate = (pageNum) => setCurrentPage(pageNum);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  useEffect(() => {
    resetError();
    if (data && loading === false) {
      getAllArticles(data.getArticlesByCategory.data.articles);
    }
  }, [data, loading]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortByCategory]);

  const displayArticles = () => {
    if (loading === true) {
      return <div className="articles">Loading Articles...</div>;
    }
    if (articles.length !== 0 && articles.length !== undefined) {
      return articles.map((article) => (
        <Article
          key={article._id}
          id={article._id}
          title={article.articleName}
          category={article.category}
          likes={article.likes}
          authorName={`${article?.author?.firstName}  ${article?.author?.lastName}`}
          profession={article.author.profession}
          description={article.description}
          image={article.image}
        />
      ));
    }
    return (
      <div className="articles">
        <p>No Articles to show.</p>
      </div>
    );
  };

  return (
    <div className="articleList">
      <div className={classes.root}>
        {displayArticles()}
        <div className="paginate">
          {articles.length !== 0 ? (
            <Pagination
              postsPerPage={articlesPerPage}
              totalPosts={data?.getArticlesByCategory.data.totalArticles}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ArticleList;

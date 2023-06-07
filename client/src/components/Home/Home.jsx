import React from 'react';
import ArticleList from '../ArticleList/ArticleList';
import Category from '../Category/Category';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <ArticleList />
      <Category />
    </div>
  );
}

export default Home;

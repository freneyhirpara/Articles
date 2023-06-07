import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../context/GlobalState';
import './Category.css';

function Category() {
  const [category, setArticleCategory] = useState('');
  const { setCategory } = useStateValue();
  useEffect(() => {
    if (category) {
      setCategory(category);
    }
  }, [category]);

  return (
    <div className="category">
      <div className="category__Body">
        <p>
          <strong>DISCOVER MORE OF WHAT MATTERS TO YOU</strong>
        </p>
        <Button
          className={
            category === 'Technology'
              ? 'category__Button active'
              : 'category__Button'
          }
          variant="outlined"
          onClick={() => {
            setArticleCategory('Technology');
          }}
        >
          Technology
        </Button>
        <Button
          className={
            category === 'Research'
              ? 'category__Button active'
              : 'category__Button'
          }
          variant="outlined"
          onClick={() => setArticleCategory('Research')}
        >
          Research
        </Button>
        <Button
          className={
            category === 'Entertainment'
              ? 'category__Button active'
              : 'category__Button'
          }
          variant="outlined"
          onClick={() => setArticleCategory('Entertainment')}
        >
          Entertainment
        </Button>
        <Button
          className={
            category === 'Gaming'
              ? 'category__Button active'
              : 'category__Button'
          }
          variant="outlined"
          onClick={() => setArticleCategory('Gaming')}
        >
          Gaming
        </Button>
        <Button
          className={
            category === 'Food' ? 'category__Button active' : 'category__Button'
          }
          variant="outlined"
          onClick={() => setArticleCategory('Food')}
        >
          Food
        </Button>
        <Button
          className={
            category === 'All' ? 'category__Button active' : 'category__Button'
          }
          variant="outlined"
          onClick={() => setArticleCategory('All')}
        >
          All
        </Button>
      </div>
    </div>
  );
}

export default Category;

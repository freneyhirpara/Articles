/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from '@material-ui/core';
import React from 'react';

function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  nextPage,
  prevPage,
  currentPage,
}) {
  const pageNumbers = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <center>
      {currentPage === pageNumbers[0] ? null : (
        <Button onClick={() => prevPage()} variant="outlined">
          Previous
        </Button>
      )}
      {pageNumbers.map((num) => (
        <Button
          className={currentPage === num ? 'active' : null}
          onClick={() => paginate(num)}
          variant="outlined"
        >
          {num}
        </Button>
      ))}
      {currentPage === pageNumbers.length ? null : (
        <Button onClick={() => nextPage()} variant="outlined">
          Next
        </Button>
      )}
    </center>
  );
}

export default Pagination;

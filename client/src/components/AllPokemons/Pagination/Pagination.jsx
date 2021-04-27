import React from 'react';
import PropTypes from 'prop-types';

import styles from './Pagination.module.sass';

function Pagination({ pages, currentPage, changePage }) {
  const pagesArray = [];

  if (pages === 1) return <></>;

  for (let i = 1; i <= pages; i += 1) {
    pagesArray.push(i);
  }

  return (
    <div className={styles.mainContainer}>
      <ul>
        {pagesArray.map((pageNumber) => (
          <li key={pageNumber}>
            {pageNumber === currentPage ? (
              <button type="button" disabled>
                {pageNumber}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  changePage(pageNumber);
                  window.scrollTo(0, 0);
                }}
              >
                {pageNumber}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Pagination;

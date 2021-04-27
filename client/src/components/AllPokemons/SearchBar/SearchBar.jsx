import React from 'react';
import PropTypes from 'prop-types';

import styles from './SearchBar.module.sass';

function SearchBar({ onSearch }) {
  return (
    <div className={styles.mainContainer}>
      <label htmlFor="pokemonName">
        <input
          id="pokemonName"
          type="text"
          autoComplete="off"
          placeholder="Name or ID"
          className={styles.searchInput}
        />
      </label>
      <button
        className={styles.searchButton}
        type="button"
        aria-label="Search"
        onClick={() =>
          onSearch(
            document.getElementById('pokemonName').value.trim().toLowerCase()
          )
        }
      />
    </div>
  );
}

SearchBar.propTypes = { onSearch: PropTypes.func.isRequired };

export default SearchBar;

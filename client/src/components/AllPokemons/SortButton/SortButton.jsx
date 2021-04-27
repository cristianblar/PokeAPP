import React from 'react';
import PropTypes from 'prop-types';

import styles from './SortButton.module.sass';

function SortButton({ sortOption, handleSort }) {
  return (
    <div className={styles.mainContainer}>
      <label htmlFor="sort">
        Sort by...
        <select name="sort" id="sort" value={sortOption} onChange={handleSort}>
          <option value="id">Id</option>
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
          <option value="attack_asc">Attack: low to high</option>
          <option value="attack_desc">Attack: high to low</option>
          <option value="experience_asc">Experience: low to high</option>
          <option value="experience_desc">Experience: high to low</option>
        </select>
      </label>
    </div>
  );
}

SortButton.propTypes = {
  sortOption: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
};

export default SortButton;

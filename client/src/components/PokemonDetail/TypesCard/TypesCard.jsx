/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './TypesCard.module.sass';

function TypesCard({ id, types, height, weight }) {
  return (
    <div className={styles.mainContainer}>
      <div>
        <ul>
          {types.map((type, index) => (
            <li key={index}>
              <img
                src={`https://res.cloudinary.com/cristianblar/image/upload/v1619141377/Types/${type}_type.png`}
                alt="Pokémon Type Badge"
                width="20"
                height="20"
              />{' '}
              {`${type.charAt(0).toUpperCase()}${type.substring(1)}`}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {height ? (
            <li>
              <span className={styles.heightIcon} /> Height:{' '}
              {id.length === 36 ? height : height * 10} cm
            </li>
          ) : (
            ''
          )}

          {weight ? (
            <li>
              <span className={styles.weightIcon} /> Weight:{' '}
              {id.length === 36 ? weight : weight * 100} g
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </div>
  );
}

TypesCard.defaultProps = {
  height: 0,
  weight: 0,
};

TypesCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.number,
  weight: PropTypes.number,
};

export default TypesCard;

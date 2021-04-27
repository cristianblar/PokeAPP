import React from 'react';
import PropTypes from 'prop-types';

import styles from './StatsCard.module.sass';

function StatsCard({ experience, health, attack, defense, speed }) {
  return (
    <div className={styles.mainContainer}>
      <ul>
        <li>
          <span className={styles.experienceIcon} /> Experience 👉 {experience}
        </li>

        {health ? (
          <li>
            <span className={styles.healthIcon} /> Health 👉 {health}
          </li>
        ) : (
          ''
        )}

        {attack ? (
          <li>
            <span className={styles.attackIcon} /> Attack 👉 {attack}
          </li>
        ) : (
          ''
        )}

        {defense ? (
          <li>
            <span className={styles.defenseIcon} /> Defense 👉 {defense}
          </li>
        ) : (
          ''
        )}

        {speed ? (
          <li>
            <span className={styles.speedIcon} /> Speed 👉 {speed}
          </li>
        ) : (
          ''
        )}
      </ul>
    </div>
  );
}

StatsCard.defaultProps = {
  health: 0,
  attack: 0,
  defense: 0,
  speed: 0,
};

StatsCard.propTypes = {
  experience: PropTypes.number.isRequired,
  health: PropTypes.number,
  attack: PropTypes.number,
  defense: PropTypes.number,
  speed: PropTypes.number,
};

export default StatsCard;

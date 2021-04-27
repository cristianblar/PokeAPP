import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import styles from './BackButton.module.sass';

import { handleError } from '../../store/actions/index';

function BackButton({ historyBack }) {
  const fixError = useDispatch();
  return (
    <button
      className={styles.mainButton}
      type="button"
      onClick={() => {
        fixError(handleError('remove'));
        historyBack();
      }}
    >
      Go back!
    </button>
  );
}

BackButton.propTypes = { historyBack: PropTypes.func.isRequired };

export default BackButton;

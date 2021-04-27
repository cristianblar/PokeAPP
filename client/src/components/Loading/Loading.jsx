import React from 'react';

import styles from './Loading.module.sass';

export default function LoadingScreen() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.rotating} />
    </div>
  );
}

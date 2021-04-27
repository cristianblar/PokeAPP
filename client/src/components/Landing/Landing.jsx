import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Landing.module.sass';

export default function Landing() {
  return (
    <>
      <div className={styles.landingBackground}>
        <Link to="/pokemons">
          <img
            className={styles.landingLogo}
            src="https://res.cloudinary.com/cristianblar/image/upload/v1619137032/Landing/Pokemon_logo_landing_button_vgeo8g.png"
            alt="Pokemon original logo"
            width="250"
            height="128"
          />
        </Link>
      </div>
    </>
  );
}

import React from 'react';

import swal from 'sweetalert';

import styles from './Footer.module.sass';

export default function Footer() {
  const showLegalInfo = () => {
    swal({
      title: 'Legal Information',
      text: `Pokémon and Pokémon character names are trademarks of Nintendo. The YouTube logo is a trademark of Google Inc. Other trademarks are the property of their respective owners.
        \nIcons designed by Pixel perfect from www.flaticon.es`,
      icon: 'info',
    });
  };

  return (
    <footer>
      <div className={styles.mainContainer}>
        <div>
          <h4>Visit the official Pokémon Social Media!</h4>
          <div className={styles.socialMediaContainer}>
            <a
              href="https://www.facebook.com/pokemon"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <span className={styles.facebook} />
            </a>
            <a
              href="https://www.youtube.com/user/Pokemon"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <span className={styles.youtube} />
            </a>
            <a
              href="https://www.twitter.com/pokemon"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <span className={styles.twitter} />
            </a>
            <a
              href="https://www.instagram.com/pokemon"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <span className={styles.instagram} />
            </a>
          </div>
        </div>
        <div>
          <img
            className={styles.pikachuPicture}
            src="https://res.cloudinary.com/cristianblar/image/upload/v1619138406/pikachu_footer_b1dr9s.png"
            alt="Pikachu jumping"
            width="163"
            height="179"
          />
        </div>
        <div>
          <button
            className={styles.legalInfo}
            type="button"
            onClick={showLegalInfo}
          >
            Legal info
          </button>
        </div>
      </div>
      <div className={styles.authorInfo}>
        <span>
          Made by{' '}
          <strong>
            <a
              href="https://www.linkedin.com/in/cristianblandon/"
              target="_blank"
              rel="noreferrer"
            >
              Cristian
            </a>
          </strong>{' '}
          in{' '}
          <a href="https://www.soyhenry.com/" target="_blank" rel="noreferrer">
            <span className={styles.henryLogo} />
          </a>
        </span>
      </div>
    </footer>
  );
}

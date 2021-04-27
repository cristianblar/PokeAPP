import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.sass';

export default function Header() {
  const toggleMenu = () => {
    const topMenu = document.getElementById('top-menu');
    if (topMenu.classList.contains(styles.hideElement))
      topMenu.classList.remove(styles.hideElement);
    else topMenu.classList.add(styles.hideElement);
  };

  return (
    <header>
      <span
        aria-hidden="true"
        role="button"
        tabIndex={0}
        className={styles.headerBurgerMenu}
        onClick={toggleMenu}
      >
        &equiv;
      </span>
      <div className={styles.headerImageContainer}>
        <Link to="/pokemons">
          <img
            src="https://res.cloudinary.com/cristianblar/image/upload/v1619137163/Pokemon_logo_header_mupehu.webp"
            alt="Pokemon logo"
            width="160"
            height="59"
          />
        </Link>
      </div>
      <nav
        className={`${styles.headerNavMenu} ${styles.hideElement}`}
        id="top-menu"
      >
        <ul>
          <li>
            <NavLink
              to="/addPokemon"
              activeStyle={{ color: '#F00000', fontWeight: 'bold' }}
            >
              Create a Pokémon
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/caughtPokemons"
              activeStyle={{ color: '#F00000', fontWeight: 'bold' }}
            >
              Caught Pokémon
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

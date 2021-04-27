import React from 'react';
import PropTypes from 'prop-types';

import styles from './Layout.module.sass';

import Header from './Header/Header';
import Footer from './Footer/Footer';

function Layout({ children: content }) {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>{content}</div>
      <Footer />
    </>
  );
}

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;

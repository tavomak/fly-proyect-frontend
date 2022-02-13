import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Header from 'components/Molecules/Header';
import Sidebar from 'components/Molecules/Sidebar';
import Footer from 'components/Molecules/Footer';
import styles from './styles.module.scss';

const Layout = ({ children }) => {
  const [activeNavbar, setActiveNavbar] = useState(false);
  return (
    <div className={`${styles.gridContainer} bg-ligth-blue`}>
      <Sidebar
        className={styles.gridSidebarNav}
        activeNavbar={activeNavbar}
        setActiveNavbar={setActiveNavbar}
      />
      <Header
        className={styles.gridHeader}
        activeNavbar={activeNavbar}
        setActiveNavbar={setActiveNavbar}
      />
      <main className={`${styles.gridMain} container-fluid content-wrapper px-5`}>
        <div className="row">
          <div className="col-12">
            { children }
          </div>
        </div>
      </main>
      <Footer
        className={styles.gridFooter}
      />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

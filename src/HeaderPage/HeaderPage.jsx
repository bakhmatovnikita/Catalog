import React from 'react';

import styles from './HeaderPage.module.css';

import logo from '../components/logo/logo.png';
import Basket from '../components/svg/basket.png';
import { NavLink } from 'react-router-dom';

const HeaderPage = ({ basket, onbeforeunload }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.headerlogo}>
          <img src={logo} style={{ width: 295 }} alt="logo" />
        </div>
        <NavLink to="/">
          <button className={styles.catalogButton}>Catalog</button>
        </NavLink>
        <div className={styles.headerBasket}>
          <NavLink to="/basket" onClick={onbeforeunload}>
            <img
              className={styles.basket}
              src={Basket}
              style={{ cursor: 'pointer' }}
              alt="basket"
            />
            <span className={styles.numberOfPositions}>{basket.length}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HeaderPage;

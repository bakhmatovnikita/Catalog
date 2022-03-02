import React from 'react';
import { NavLink } from 'react-router-dom';
import Basket from '../Basket/Basket';
import styles from './Catalog.module.css';

const Catalog = ({ setItemToBasket, list, basketData, onbeforeunload }) => {
  console.log(list);
  return (
    <div className={styles.container}>
      <div className={styles.сatalogList}>
        {list.map((item) => (
          <div className={styles.сatalogItem}>
            <div className={styles.nameItem}>
              <h2>{item.name}</h2>
              <div className={styles.priceItem}>
                <h2>{`${item.price} ₽`}</h2>
              </div>
            </div>
            <div className={styles.imageItem}>
              <img className={styles.image} src={item.image} alt={item.image} />
            </div>
            <div className={styles.saleItem}>
              <div className={styles.saleOpt}>
                <div className={`${styles.button} ${styles.buttonOutline} ${styles.buttonAdd}`}>
                  {basketData.filter((x) => x.id === item.id).length > 0 ? (
                    <NavLink className={styles.saleBasket} to="/basket" onClick={onbeforeunload}>
                      <span>Оформить покупку</span>
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => setItemToBasket(item.name, item.price, item.id)}
                      className={styles.saleBasket}>
                      <span>Добавить в карзину</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;

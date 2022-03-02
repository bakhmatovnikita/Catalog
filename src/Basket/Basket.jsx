import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Basket.module.css';
import BasketItem from './BasketItem/BasketItem';

const Basket = ({ data, setBasketData }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    calculateTotal();
  }, [data]);
  const calculateTotal = () => {
    let total = 0;
    [...data].map((item) => item.price * item.count).forEach((price) => (total += price));
    setTotal(total);
  };
  const subCount = (id) => {
    const copyData = [...data];
    const idx = copyData.findIndex((el) => el.id === id);
    if (copyData[idx].count > 1) {
      copyData[idx].count = copyData[idx].count - 1;
    }
    setBasketData(copyData);
  };

  const addCount = (id) => {
    const copyData = [...data];
    const idx = copyData.findIndex((el) => el.id === id);
    copyData[idx].count = copyData[idx].count + 1;
    setBasketData(copyData);
  };

  const deleteItem = (id) => {
    const copyData = [...data];
    const idx = copyData.findIndex((el) => el.id === id);
    const beforeData = copyData.splice(0, idx);
    const afterData = copyData.splice(idx + 1, copyData.length);
    const newData = [...beforeData, ...afterData];
    setBasketData(newData);
  };

  return (
    <div className={styles.basketWrapper}>
      <div className={styles.basket}>
        <div className={styles.basketTitle}>
          <h2>Ваш заказ</h2>
          <div className={styles.basketTitleCloseIcon}>
            <NavLink to="/">
              <span className={`${styles.closeIcon} ${styles.closeIconOne}`} />
              <span className={`${styles.closeIcon} ${styles.closeIconTwo}`} />
            </NavLink>
          </div>
        </div>
        <div className={styles.itemsWrapper}>
          {data.length === 0 ? <h2 className={styles.basketNull}>Корзина пуста</h2> : ''}
          {data.map((item) => {
            return (
              <BasketItem
                deleteItem={deleteItem}
                addCount={addCount}
                subCount={subCount}
                item={item}
              />
            );
          })}
        </div>
        <div className={styles.basketTotal}>
          <span />
          <div className={styles.totalSum}>Сумма заказа: {total} руб</div>
        </div>
        <div className={styles.basketForm}>
          <div className={styles.basketFormTitle}>Контакты</div>
          <div className={styles.basketFormDoubleInput}>
            <input
              className={`${styles.basketFormInput} ${styles.firstInput}`}
              placeholder="Ваше имя"
            />
            <input className={styles.basketFormInput} placeholder="Телефон" />
          </div>
          <input className={styles.basketFormInput} placeholder="Адрес доставки" />
        </div>
        <div className={styles.basketCheckboxes}>
          <div className={styles.basketCheckboxesTitle}>Способ оплаты</div>
          <label className={styles.basketCheckboxesFlex}>
            <input type="checkbox" />
            <div>Оплата наличными или картой курьеру</div>
          </label>
          <label className={styles.basketCheckboxesFlex}>
            <input type="checkbox" />
            <div>Оплата картой онлайн на сайте</div>
          </label>
        </div>
        <button className={styles.basketCheckboxesSubmit}>ОФОРМИТЬ ЗАКАЗ</button>
      </div>
    </div>
  );
};

export default Basket;

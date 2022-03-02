import React, { useState, useEffect } from 'react';

import styles from './MainPage.module.css';
import Catalog from '../Catalog/Catalog';

function MainPage({ list, setItemToBasket, basketData, onbeforeunload }) {
  const [currentData, setCurrentData] = useState(list);
  const [type, setType] = useState('all');

  useEffect(() => {
    if (type === 'all') {
      setCurrentData(list);
    } else {
      const newData = list.filter((item) => item.types.includes(type));
      setCurrentData(newData);
    }
  }, [type]);
  return (
    <div className="container" style={{ flexWrap: 'wrap' }}>
      <Catalog
        setItemToBasket={setItemToBasket}
        list={list}
        basketData={basketData}
        onbeforeunload={onbeforeunload}
      />
    </div>
  );
}
export default MainPage;

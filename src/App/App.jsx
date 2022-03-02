import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import HeaderPage from '../HeaderPage/HeaderPage';
import Basket from '../Basket/Basket';
import styles from './App.module.css';

function App() {
  const [list, setList] = useState([]);
  const [basketData, setBasketData] = useState(JSON.parse(localStorage.getItem('basketArray')));

  const setItemToBasket = (name, price, id) => {
    const some = basketData.some((item) => item.name === name && item.price === price);
    if (some) {
      const newData = basketData.map((item) => {
        if (item.name === name && item.price === price) {
          return { ...item, count: item.count + 1 };
        } else {
          return item;
        }
      });
      setBasketData(newData);
    } else {
      const obj = { name, price, id, count: 1 };
      setBasketData((prevData) => [...prevData, obj]);
    }
  };

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get('https://appevent.ru/dev/task1/catalog');

      setList(res.data.items);
    };

    getList();
  }, []);

  useEffect(() => {
    localStorage.setItem('basketArray', JSON.stringify(basketData));
  }, [basketData.length]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('basketArray'));
    setBasketData(data);
  }, []);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <BrowserRouter>
          <Route
            exact
            path=""
            render={(props) => (
              <HeaderPage {...props} basket={basketData} onbeforeunload={onbeforeunload} />
            )}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <MainPage
                  {...props}
                  setItemToBasket={setItemToBasket}
                  list={list}
                  basketData={basketData}
                  onbeforeunload={onbeforeunload}
                />
              )}
            />
            <Route
              exact
              path="/basket"
              render={(props) => (
                <Basket {...props} setBasketData={setBasketData} data={basketData} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

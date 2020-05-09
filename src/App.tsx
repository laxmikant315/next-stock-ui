import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.styles.tsx';
import StockContent from './pages/stocks/stocks';
import { getNotifications } from './services/stock.service';
import { AppStyles } from './App.styles';

function App() {

  const [notifications,setNotifications]= useState([])
  useEffect(()=>{
    getNotifications().then(x=>{
      setNotifications(x)
    })
  },[])
  return (
    <AppStyles>
        {notifications && notifications.map((x,i)=><StockContent key={i} stockDetails={x}/>)}
    </AppStyles>
  );
}

export default App;

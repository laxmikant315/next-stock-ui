

import React,{ useEffect, useState, lazy } from 'react';
import { HomeStyles } from './home.styles';
import {   Tabs } from "antd";
import io from "socket.io-client";
import IntradayStocks from '../intraday-stocks/intraday-stocks.component';


//const ScrollableStocks = lazy(() => import('../scrollable-stocks/scrollable-stocks.component'));

 const ScrollableStocks = lazy(() => import('../virtualise-stocks/virtualise-stocks.component'));



const { TabPane } = Tabs;

const Home = ()=>{
    const [intradayStocks, setIntradayStocks] = useState<any[]>([]);
    const [swingStocks, setSwingStocks] = useState<any[]>([]);

    const MyContext = React.createContext({});


  useEffect(() => {
    
    const url =process.env.REACT_APP_API_URL 
    if(url){
      const socket = io(url);

      socket.on("FromAPI", (data: any) => {
      
        if(data.type==="intraday")  setIntradayStocks([data]);
        if(data.type==="swing") setSwingStocks([data]);
       

       
      });
    }
    
  }, []);


    return <HomeStyles>
             
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Intraday" key="1">
          <IntradayStocks  liveData={intradayStocks}/>
      
          
        </TabPane>
        <TabPane tab="Swing" key="2">
        <ScrollableStocks />
        </TabPane>
      </Tabs>
    </HomeStyles>
}

export default Home;
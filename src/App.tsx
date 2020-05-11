import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.styles.tsx";
import StockContent from "./pages/stocks/stocks";
import { getNotifications } from "./services/stock.service";
import { AppStyles } from "./App.styles";
import { Row, Col, Tabs } from "antd";
import io from "socket.io-client";
import moment from "moment";
const { TabPane } = Tabs;

function App() {
  const [notifications, setNotifications] = useState<any[]>([]);


  useEffect(() => {
    getNotifications().then((x) => {
      setNotifications(x);
    });
    const url =process.env.REACT_APP_API_URL 
    if(url){
      const socket = io(url);

      socket.on("FromAPI", (data: any) => {
       
        setNotifications((notifications:any)=>[...notifications,data]);

      });
    }
    
  }, []);

  function callback(key: any) {
    console.log(key);
  }

  return (
    <AppStyles>
      
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Intraday" key="1">
          <Row>
            {notifications &&
              notifications
                .filter((x: any) => x.type === "intraday")
                .sort((a, b) => moment(a.createDt) > moment(b.createDt) ? 1 : -1)
                .map((x:any, i:number) => (
                  <Col xs={24} sm={24} md={24} lg={12} style={{ padding: 10 }}>
                    <StockContent key={i} stockDetails={x} />
                  </Col>
                ))}
          </Row>
        </TabPane>
        <TabPane tab="Swing" key="2">
          <Row>
            {notifications &&
              notifications
                .filter((x: any) => x.type === "swing")
                .sort((a, b) => moment(a.createDt) > moment(b.createDt) ? 1 : -1)
                .map((x:any, i:number) => (
                  <Col xs={24} sm={24} md={24} lg={12} style={{ padding: 10 }}>
                    <StockContent key={i} stockDetails={x} />
                  </Col>
                ))}
          </Row>
        </TabPane>
      </Tabs>
    </AppStyles>
  );
}

export default App;

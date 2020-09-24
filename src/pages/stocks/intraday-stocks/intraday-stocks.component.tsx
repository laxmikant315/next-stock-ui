import React, { useState, useEffect } from "react";

import StockContent from "../stocks";
import { Row, Col } from "antd";

import { getNotifications } from "../../../services/stock.service";
const IntradayStocks = ({
  liveData,
}: {
  liveData?: any;
}) => {
  const [tracks, setTracks] = useState<any>([]);

  useEffect(() => {
    if (liveData.length) {
      setTracks([...liveData, ...tracks]);
    }
  }, [liveData,tracks]);

 

  useEffect(()=>{
    getNotifications('intraday')
      .then((resp) => {
        if (resp) {
        
            setTracks((prevTracks:any)=>[...prevTracks,...resp.data]);
          
        }
      });
  },[])

  return (
    <Row>
    {tracks &&
      tracks.map((track: any, i: number) => (
        <Col
          key={i}
          xs={24}
          sm={24}
          md={24}
          lg={12}
          style={{ padding: 10 }}
        >
          <StockContent stockDetails={track} />
        </Col>
      ))}
      </Row>
  );
};

export default IntradayStocks;

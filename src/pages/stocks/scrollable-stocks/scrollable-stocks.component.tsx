import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";

import StockContent from "../stocks";
import { Row, Col } from "antd";

import { getNotifications } from "../../../services/stock.service";
const ScrollableStocks = ({
  type,
  liveData,
}: {
  type: string;
  liveData?: any;
}) => {
  const [tracks, setTracks] = useState<any>([]);
  const [hasMoreItems, setHasMoreItem] = useState<boolean>(true);
  const [offSet, setOffSet] = useState<number>(0);

  useEffect(() => {
    if (liveData.length) {
      setTracks([...liveData, ...tracks]);
    }
  }, [liveData,tracks]);

  const loadItems = (page: any) => {
  
    getNotifications(type,offSet.toString())
      .then((resp) => {
        if (resp) {
          setOffSet(offSet + 1);
          
          if (resp.hasMoreItems) {
            setTracks((prevTracks:any)=>[...prevTracks,...resp.data]);
          } else {
            setHasMoreItem(false);
          }
        }
      });
  };

  const loader = <div className="loader">Loading ...</div>;
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadItems}
      hasMore={hasMoreItems}
      loader={loader}
    >
    
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
    </InfiniteScroll>
  );
};

export default ScrollableStocks;

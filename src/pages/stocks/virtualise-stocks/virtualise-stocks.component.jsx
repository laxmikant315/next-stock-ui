import * as React from "react";
import { AutoSizer, InfiniteLoader, List,CellMeasurer,CellMeasurerCache } from "react-virtualized";

import { getNotifications } from "../../../services/stock.service";
import 'react-virtualized/styles.css';
import StockContent from "../stocks";




export default () => {

  const cache = new CellMeasurerCache({
    fixedWidth:true,
    defaultHeight:300
  });

const [list,setList]=React.useState([]);

const remoteRowCount= 5;

const isRowLoaded= ({ index })=> {
  return !!list[index];
}

const loadMoreRows = ({ startIndex, stopIndex })=> {
 

   
    if(startIndex%remoteRowCount===0){
      const offSet = startIndex / remoteRowCount;
      console.log(startIndex,offSet)
      return getNotifications("swing", offSet.toString(), remoteRowCount).then(
              (x) => {
                setList((prev)=>[...prev,...x.data]);
              }
            );
    }
    
    
}

const rowRenderer =({ key, index,parent, style})=> {
  return (
    <CellMeasurer
    key={key}
     cache={cache}
     parent={parent}
     columnIndex={0}
     rowIndex={index}
    >
      <div  style={style}>
      {list && list[index] &&  <StockContent stockDetails={ list[index]} />}
      </div>
    </CellMeasurer>
  )
}


  return (
    <>

    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={500}
      threshold={remoteRowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer disableHeight>
          {({width,height})=>(
        <List
          height={700}
          onRowsRendered={onRowsRendered}
          ref={registerChild}
          rowCount={500}
          deferredMeasurementCache={cache}

          rowHeight={cache.rowHeight}
          rowRenderer={rowRenderer}
          width={width}
        />)}
        </AutoSizer>
      )}
    </InfiniteLoader>
    
    </>
  );
};

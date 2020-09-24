import React from 'react';
import { shallow } from 'enzyme';
import IntradayStocks from './intraday-stocks.component';
import App from '../../../App';

const tracks=[
  {
    "highestHigh":{"highest":460,"indexNo":1},
    "lowestLow":{"lowest":280,"indexNo":15},
    "high":{"highest":357,"indexNo":10},"low":{"lowest":348.2,"indexNo":9},
    "_id":"5ebd171bc2cab40017f2e252",
    "createDt":"2020-05-14T10:02:03.000Z",
    "instrument":"486657","goodOne":true,"avgHeight":12.22307692307692,"lastHeight":14.349999999999966,
    "trend":"DOWN","valid":true,"symbol":"CUMMINSIND","avgCandelSize":50.51,"todayCandelSize":12.7,
    "allowedCandelSize":35.36,"lastCandelIsGreen":false,"currentPrice":345.3,"type":"swing","__v":0
  },
    {"highestHigh":{"highest":360.95,"indexNo":25},"lowestLow":{"lowest":184.45,"indexNo":5},"high":{"highest":250.75,"indexNo":16},"low":{"lowest":253,"indexNo":17},"_id":"5ebd171bc2cab40017f2e253","createDt":"2020-05-14T10:02:03.000Z","instrument":"1895937","goodOne":true,"avgHeight":8.770512820512819,"lastHeight":10.25,"trend":"UP","valid":true,"symbol":"GLENMARK","avgCandelSize":50.58,"todayCandelSize":9.25,"allowedCandelSize":35.41,"lastCandelIsGreen":true,"currentPrice":346.75,"type":"swing","__v":0},{"highestHigh":{"highest":374,"indexNo":16},"lowestLow":{"lowest":235,"indexNo":3},"high":{"highest":305.9,"indexNo":5},"low":{"lowest":247.65,"indexNo":10},"_id":"5ebd171bc2cab40017f2e254","createDt":"2020-05-14T10:02:03.000Z","instrument":"2029825","goodOne":true,"avgHeight":8.68974358974359,"lastHeight":15.75,"trend":"UP","valid":true,"symbol":"CADILAHC","avgCandelSize":21.4,"todayCandelSize":14.9,"allowedCandelSize":14.98,"lastCandelIsGreen":true,"currentPrice":338.85,"type":"swing","__v":0},{"highestHigh":{"highest":192,"indexNo":21},"lowestLow":{"lowest":103,"indexNo":7},"high":{"highest":133.9,"indexNo":9},"low":{"lowest":110,"indexNo":13},"_id":"5ebd171bc2cab40017f2e255","createDt":"2020-05-14T10:02:03.000Z","instrument":"3871745","goodOne":true,"avgHeight":6.4153846153846175,"lastHeight":8.199999999999989,"trend":"UP","valid":true,"symbol":"KOLTEPATIL","avgCandelSize":20.69,"todayCandelSize":8.1,"allowedCandelSize":14.48,"lastCandelIsGreen":true,"currentPrice":165.1,"type":"swing","__v":0},{"highestHigh":{"highest":173,"indexNo":20},"lowestLow":{"lowest":98.1,"indexNo":5},"high":{"highest":147,"indexNo":11},"low":{"lowest":130.1,"indexNo":13},"_id":"5ebd171bc2cab40017f2e256","createDt":"2020-05-14T10:02:03.000Z","instrument":"4617985","goodOne":true,"avgHeight":4.901282051282048,"lastHeight":6.199999999999989,"trend":"UP","valid":true,"symbol":"ADVENZYMES","avgCandelSize":22.49,"todayCandelSize":9.05,"allowedCandelSize":15.74,"lastCandelIsGreen":true,"currentPrice":150.1,"type":"swing","__v":0},{"highestHigh":{"highest":1825,"indexNo":15},"lowestLow":{"lowest":1200,"indexNo":3},"high":{"highest":1622,"indexNo":5},"low":{"lowest":1232,"indexNo":9},"_id":"5ebd171ac2cab40017f2e250","createDt":"2020-05-14T10:02:02.000Z","instrument":"418049","goodOne":true,"avgHeight":49.16025641025641,"lastHeight":76.39999999999986,"trend":"UP","valid":true,"symbol":"IPCALAB","avgCandelSize":52.73,"todayCandelSize":16.3,"allowedCandelSize":36.91,"lastCandelIsGreen":true,"currentPrice":1596.3,"type":"swing","__v":0},{"highestHigh":{"highest":580.5,"indexNo":18},"lowestLow":{"lowest":442.65,"indexNo":7},"high":{"highest":518.95,"indexNo":7},"low":{"lowest":458.4,"indexNo":12},"_id":"5ebd171ac2cab40017f2e251","createDt":"2020-05-14T10:02:02.000Z","instrument":"2674433","goodOne":true,"avgHeight":13.106410256410246,"lastHeight":36.5,"trend":"UP","valid":true,"symbol":"MCDOWELL-N","avgCandelSize":43.62,"todayCandelSize":8.5,"allowedCandelSize":30.53,"lastCandelIsGreen":true,"currentPrice":541.5,"type":"swing","__v":0},{"highestHigh":{"highest":389.6,"indexNo":27},"lowestLow":{"lowest":180.1,"indexNo":5},"high":{"highest":333.15,"indexNo":15},"low":{"lowest":305,"indexNo":17},"_id":"5ebbe218a3110c00171b6a70","createDt":"2020-05-13T12:03:36.000Z","instrument":"324353","goodOne":true,"avgHeight":10.05921052631579,"lastHeight":16.19999999999999,"trend":"UP","valid":true,"symbol":"GUJALKALI","avgCandelSize":37.74,"todayCandelSize":6.8,"allowedCandelSize":26.42,"lastCandelIsGreen":true,"currentPrice":346.2,"type":"swing","__v":0},{"highestHigh":{"highest":3674,"indexNo":18},"lowestLow":{"lowest":2910,"indexNo":7},"high":{"highest":3390,"indexNo":9},"low":{"lowest":3025,"indexNo":13},"_id":"5ebbe218a3110c00171b6a6f","createDt":"2020-05-13T12:03:36.000Z","instrument":"2952193","goodOne":true,"avgHeight":86.24078947368423,"lastHeight":96.69999999999982,"trend":"UP","valid":true,"symbol":"ULTRACEMCO","avgCandelSize":235.45,"todayCandelSize":115.7,"allowedCandelSize":164.81,"lastCandelIsGreen":true,"currentPrice":3546.7,"type":"swing","__v":0},{"highestHigh":{"highest":470,"indexNo":0},"lowestLow":{"lowest":249.4,"indexNo":14},"high":{"highest":374,"indexNo":7},"low":{"lowest":315.8,"indexNo":6},"_id":"5ebbe218a3110c00171b6a71","createDt":"2020-05-13T12:03:36.000Z","instrument":"5565441","goodOne":true,"avgHeight":12.336842105263159,"lastHeight":13.949999999999989,"trend":"DOWN","valid":true,"symbol":"CHOLAHLDNG","avgCandelSize":39.59,"todayCandelSize":22.15,"allowedCandelSize":27.71,"lastCandelIsGreen":false,"currentPrice":264.85,"type":"swing","__v":0}];




    const setHookState = (newState:any) => jest.fn().mockImplementation(() => [
      newState,
      () => {},
    ]);



describe('ComponentWithHook component', () => {
  it('should render itself', () => {
    React.useState = setHookState({
      tracks
    });
    console.log(React.useState)
    const wrapper = shallow(<IntradayStocks/>)  
    expect(wrapper).toMatchSnapshot();
  });
});

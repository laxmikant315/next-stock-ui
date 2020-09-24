import React, { Suspense } from "react";


import  AppStyles  from "./App.styles";
 import Home from "./pages/stocks/home/home.component";
import Test from './pages/test/test.component'

function App() {
  

  return (
    <AppStyles>
      <Suspense fallback={()=><h1>Loading</h1>}>
      {/* <Home/> */}

      <h1>Hello</h1>
      <input type="text"  inputMode="numeric"/>
      {/* <Test/> */}
      </Suspense>
    </AppStyles>
  );
}

export default App;

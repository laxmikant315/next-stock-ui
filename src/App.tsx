import React, { Suspense } from "react";

import "./App.styles.tsx";

import { AppStyles } from "./App.styles";
import Home from "./pages/stocks/home/home.component";


function App() {
  

  return (
    <AppStyles>
      <Suspense fallback={()=><h1>Loading</h1>}>
      <Home/>
      </Suspense>
    </AppStyles>
  );
}

export default App;

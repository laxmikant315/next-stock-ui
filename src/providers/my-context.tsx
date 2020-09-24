import React, { useContext } from "react";

const MyContext = React.createContext({name:'Laxmikant',age:12,myVal:"nothing"});
export default MyContext;
export const useMyContext = () => useContext(MyContext);

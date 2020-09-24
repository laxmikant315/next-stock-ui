import React from "react";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MyContext, { useMyContext } from "./my-context";
import * as MyContextModule from "./my-context";

Enzyme.configure({ adapter: new Adapter() });

export const MyComponent = () => {
  const { myVal,name } = useMyContext();

  return <div data-test="my-component">{myVal}{name}</div>;
};

it("renders the correct text", () => {
  jest.spyOn(MyContextModule, "useMyContext").mockImplementation(() => ({
    myVal: "foobar",
    name:'Sandesh'
  }));

  const wrapper = shallow(
    // <MyContext.Provider>
      <MyComponent />
    // </MyContext.Provider>
  )

  expect(wrapper).toMatchSnapshot()
});

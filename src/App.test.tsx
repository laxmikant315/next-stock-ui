import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

it('render test',()=>{

  expect(shallow(<App/>)).toMatchSnapshot()
})

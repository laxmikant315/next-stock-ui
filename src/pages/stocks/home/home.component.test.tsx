import React from 'react';
import { shallow } from 'enzyme';
import Home from './home.component';

it('render test',()=>{

  expect(shallow(<Home/>)).toMatchSnapshot()
})

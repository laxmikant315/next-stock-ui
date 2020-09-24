import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from './test.component';


describe('<Login /> with no props', () => {

    const state= {
        email: 'acesmndr@gmail.com',
        password: 'notapassword',
        isLoginDisabled:false
      }


    
  // jest.spyOn(React, 'useState').mockImplementation(()=>[state,()=>{}]);

  const container = mount(<Login {...state} />);
  

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });

 
});
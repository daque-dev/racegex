import { shallow } from 'enzyme';
import React from 'react';

import Home from '../pages/index';

describe('With Enzyme', () => {
  it('App shows "A simple example repo" in a <p> tag', () => {
    const app = shallow(<Home />);
    expect(app.find('p').text()).toEqual('A simple example repo');
  });
});

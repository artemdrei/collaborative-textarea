import React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Page from '.';

jest.mock('react-router-dom', () => ({
  withRouter: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Editor page', () => {
  let wrapper: ShallowWrapper<null>;

  beforeEach(() => {
    wrapper = shallow(<Page />);
  });

  it('should match the snapshot', () => expect(toJson(wrapper)).toMatchSnapshot());
});

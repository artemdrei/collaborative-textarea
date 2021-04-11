import React from 'react';
import { render } from '@testing-library/react';

import Header from './index';

describe('Header', () => {
  it('should take a snapshot', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Form for collaboration')).toMatchSnapshot();
  });
});

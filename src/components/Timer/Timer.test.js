import React from 'react';
import { render } from '@testing-library/react';
import Timer from './Timer';

test('renders learn react link', () => {
  const { getByText } = render(<Timer />);
  const linkElement = getByText(/fast fingers/i);
  expect(linkElement).toBeInTheDocument();
});

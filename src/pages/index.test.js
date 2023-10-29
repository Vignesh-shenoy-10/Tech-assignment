import React from 'react';
import { render, screen } from '@testing-library/react';
import IndexPage from './IndexPage';

jest.mock('axios');

describe('IndexPage', () => {
  it('should render a list of users', async () => {
    axios.get.mockResolvedValueOnce([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]);
    render(<IndexPage />);
    await screen.findByText('List of Users');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('should render a link to view the albums for each user', async () => {
    axios.get.mockResolvedValueOnce([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]);
    render(<IndexPage />);
    await screen.findByText('List of Users');
    const links = screen.getAllByText('View Albums');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', `/albums/1`);
    expect(links[1]).toHaveAttribute('href', `/albums/2`);
  });
});
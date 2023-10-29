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
    const userCards = screen.getAllByRole('card');
    expect(userCards).toHaveLength(2);
  });

  it('should render the name of each user', async () => {
    axios.get.mockResolvedValueOnce([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]);
    render(<IndexPage />);
    await screen.findByText('List of Users');
    const userNames = screen.getAllByText('John Doe', 'Jane Doe');
    expect(userNames).toHaveLength(2);
  });

  it('should render a view album button for each user', async () => {
    axios.get.mockResolvedValueOnce([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]);
    render(<IndexPage />);
    await screen.findByText('List of Users');
    const viewAlbumButtons = screen.getAllByText('View album');
    expect(viewAlbumButtons).toHaveLength(2);
  });

  it('should navigate to the album page when the view album button is clicked', async () => {
    axios.get.mockResolvedValueOnce([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]);

    render(<IndexPage />);

    await screen.findByText('List of Users');
    const viewAlbumButton = screen.getByText('View album');
    viewAlbumButton.click();
    expect(screen.getByText('Photo Album'));
  });
});
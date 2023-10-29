import React from 'react';
import { render, screen } from '@testing-library/react';
import AlbumPage from './AlbumPage';

jest.mock('axios');

describe('AlbumPage', () => {
  it('should render a back button', async () => {
    axios.get.mockResolvedValueOnce({
      id: 1,
      title: 'Photo Album',
      photos: [
        { id: 1, thumbnailUrl: 'https://example.com/photo1.jpg' },
        { id: 2, thumbnailUrl: 'https://example.com/photo2.jpg' },
      ],
    });
    render(<AlbumPage />);
    await screen.findByText('Photo Album');
    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
  });

  it('should render a grid of photo cards', async () => {
    axios.get.mockResolvedValueOnce({
      id: 1,
      title: 'Photo Album',
      photos: [
        { id: 1, thumbnailUrl: 'https://example.com/photo1.jpg' },
        { id: 2, thumbnailUrl: 'https://example.com/photo2.jpg' },
      ],
    });

    render(<AlbumPage />);

    await screen.findByText('Photo Album');
    const photoCards = screen.getAllByRole('card');
    expect(photoCards).toHaveLength(2);
  });

  it('should render the thumbnail of each photo', async () => {
    axios.get.mockResolvedValueOnce({
      id: 1,
      title: 'Photo Album',
      photos: [
        { id: 1, thumbnailUrl: 'https://example.com/photo1.jpg' },
        { id: 2, thumbnailUrl: 'https://example.com/photo2.jpg' },
      ],
    });
    render(<AlbumPage />);

    await screen.findByText('Photo Album');
    const photoThumbnails = screen.getAllByRole('img');
    expect(photoThumbnails[0]).toHaveAttribute('src', 'https://example.com/photo1.jpg');
    expect(photoThumbnails[1]).toHaveAttribute('src', 'https://example.com/photo2.jpg');
  });
});
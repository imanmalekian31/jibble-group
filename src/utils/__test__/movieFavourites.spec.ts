import { beforeEach, describe, expect, it } from 'vitest';
import { type Ref, ref } from 'vue';

import type { Movie } from '../../models';
import { handleMovieFavouriteToggle } from '../movieFavourites';

const mockMovie1: Movie = {
  imdbID: 'tt0189200',
  Title: 'Waterworld',
  Year: 1995,
};

const mockMovie2: Movie = {
  imdbID: 'tt0124365',
  Title: 'Deep Waterworld',
  Year: 1995,
};

describe('handleMovieFavoriteToggle', () => {
  let favouriteMovies: Ref<Movie[]>;

  beforeEach(() => {
    favouriteMovies = ref<Movie[]>([]);
  });

  it('should add a movie to favourites when not already favorite', () => {
    handleMovieFavouriteToggle(mockMovie1, favouriteMovies);
    expect(favouriteMovies.value).toHaveLength(1);
    expect(favouriteMovies.value[0]).toEqual(mockMovie1);
  });

  it('should remove a movie from favourites when already favorite', () => {
    favouriteMovies.value.push(mockMovie1);
    handleMovieFavouriteToggle(mockMovie1, favouriteMovies);
    expect(favouriteMovies.value).toHaveLength(0);
  });

  it('should handle multiple movies being added and removed', () => {
    handleMovieFavouriteToggle(mockMovie1, favouriteMovies);
    expect(favouriteMovies.value).toHaveLength(1);

    handleMovieFavouriteToggle(mockMovie2, favouriteMovies);
    expect(favouriteMovies.value).toHaveLength(2);

    handleMovieFavouriteToggle(mockMovie1, favouriteMovies);
    expect(favouriteMovies.value).toHaveLength(1);
    expect(favouriteMovies.value[0]).toEqual(mockMovie2);
  });
});

import type { Ref } from 'vue';

import type { Movie } from '../models';

export function handleMovieFavouriteToggle(
  movie: Movie,
  favouriteMovies: Ref<Movie[]>
) {
  const isFavorite = favouriteMovies.value.some(
    (item) => item.imdbID === movie.imdbID
  );

  if (isFavorite) {
    favouriteMovies.value = favouriteMovies.value.filter(
      (item) => item.imdbID !== movie.imdbID
    );
  } else {
    favouriteMovies.value.push(movie);
  }
}

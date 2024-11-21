import type { Movie, PaginationResponse } from '../models';
import fetcher from './fetcher';

export function getMoviesListAPI(page: number, search?: string) {
  return fetcher.get<PaginationResponse<Movie>>('/movies/search', {
    params: { page, Title: search },
  });
}

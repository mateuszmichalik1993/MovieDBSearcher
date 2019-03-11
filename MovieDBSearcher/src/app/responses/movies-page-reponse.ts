import { Movie } from 'src/app/responses/movie';

export interface MoviesPageReponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Movie[];
  }
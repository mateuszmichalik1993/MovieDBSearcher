import { MovieListItem } from 'src/app/models/movies-list-item';

export  interface MoviesPage {
    page: number;
    totalPages: number;
    totalResults: number;
    movies: MovieListItem[];
  }

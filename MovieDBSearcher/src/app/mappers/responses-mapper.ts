import { MoviesPageReponse } from 'src/app/responses/movies-page-reponse';
import { MovieListItem } from 'src/app/models/movies-list-item';
import { Movie } from 'src/app/responses/movie';
import { ErrorResponse } from 'src/app/responses/error-response';
import { MoviesPage } from 'src/app/models/movies-page';

export class MovieMapper {
    static mapToListItem(movie: Movie, baseImageUrl: string): MovieListItem {
        return {
            adult: movie.adult,
            id: movie.id,
            mediaType: movie.media_type,
            originalLanguage: movie.original_language,
            overview: movie.overview,
            popularity: movie.popularity,
            posterPath: movie.poster_path ? `${baseImageUrl}w185/${movie.poster_path}` : null,
            releaseDate: movie.release_date,
            title: movie.title,
        };
    }
}

export class MoviesPageReponseMapper {
    static mapToMoviesPage(response: MoviesPageReponse, baseImageUrl: string): MoviesPage {
        return {
            page: response.page,
            totalPages: response.total_pages,
            totalResults: response.total_results,
            movies: response.results.map(movie => MovieMapper.mapToListItem(movie, baseImageUrl))

        } as MoviesPage;
    }
}

export class ErrorMapper {
    static mapToErrorResponse(error: string): ErrorResponse {
        const errorResponse = JSON.parse(error);
        if (errorResponse.errors != null && errorResponse.errors.length > 0) {
            return errorResponse;
        }
        return { errors: ['Unknown error'] } as ErrorResponse;
    }
}
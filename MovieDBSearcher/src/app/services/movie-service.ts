import { Component, OnInit, Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { MovieSearcher } from 'src/app/services/movie-searcher';
import { ConfigurationService } from 'src/app/services/configuration-service';
import { MoviesPage } from 'src/app/models/movies-page';
import { MoviesPageReponse } from '../responses/movies-page-reponse';
import { ErrorMapper, MoviesPageReponseMapper } from '../mappers/responses-mapper';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

@Injectable()
export class MovieService {

    private baseImageUrl: string = null;

    constructor(private searcher: MovieSearcher, private configurationService: ConfigurationService) { }

    searchMovies(searchQuery: string, page: number): Observable<MoviesPage> {
        return this.searcher.search(searchQuery, page)
            .pipe(
                catchError(errorResponse => this.handleError(errorResponse)),
                switchMap(movies => this.handleRespone(movies)),
                catchError(errorResponse => this.handleError(errorResponse)),
        ) as Observable<MoviesPage>;
    }

    getPopular(page: number): Observable<MoviesPage> {
        return this.searcher.getPopular(page)
            .pipe(
                catchError(errorResponse => this.handleError(errorResponse)),
                switchMap(movies => this.handleRespone(movies)),
                catchError(errorResponse => this.handleError(errorResponse))
            );
    }

    private handleRespone(movies: MoviesPageReponse): Observable<MoviesPage> {
        if (this.baseImageUrl != null) {
            return of(this.mapPage(movies));
        }
        const result = this.configurationService.getBaseImageUrl()
            .pipe(
                catchError(errorResponse => this.handleError(errorResponse)),
                tap((url: string) => this.baseImageUrl = url),
                map(() => this.mapPage(movies))
            );
        return result;
    }

    private handleError(error: string) {
        return Observable.throw(ErrorMapper.mapToErrorResponse(error));
    }

    private mapPage(response: MoviesPageReponse): MoviesPage {
        return MoviesPageReponseMapper.mapToMoviesPage(response, this.baseImageUrl);
    }
}
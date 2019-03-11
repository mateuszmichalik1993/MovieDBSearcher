import { Observable } from 'rxjs/internal/Observable';
import * as theMovieDb from 'themoviedb-javascript-library';
import {  Injectable } from '@angular/core';
import { MoviesPageReponse } from 'src/app/responses/movies-page-reponse';

@Injectable()
export  class MovieSearcher {
  search(searchQuery: string, page: number): Observable<MoviesPageReponse> {
    return Observable.create((observer) => {
      theMovieDb.search.getMulti({ query: encodeURI(searchQuery), page: page }, data => {
        observer.next(JSON.parse(data));
        observer.complete();
      }, error => observer.error(error));
    });
  }

  getPopular(page: number): Observable<MoviesPageReponse> {
    return Observable.create((observer) => {
      theMovieDb.movies.getPopular({ page: page }, data => {
        observer.next(JSON.parse(data));
        observer.complete();
      }, error => observer.error(error));
    });
  }
}

import { Observable } from 'rxjs/internal/Observable';
import * as theMovieDb from 'themoviedb-javascript-library';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

  getBaseImageUrl(): Observable<string> {
    return Observable.create((observer) => {
      theMovieDb.configurations.getConfiguration(data => {
        observer.next(JSON.parse(data).images.secure_base_url);
        observer.complete();
      }, error => observer.error(error));
    });
  }
}
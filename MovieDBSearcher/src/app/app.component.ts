import { Component, OnInit, Injectable } from '@angular/core';
import { API_KEY } from './constants/api-key';
import * as theMovieDb from 'themoviedb-javascript-library';
import { Subject } from 'rxjs';
import { ErrorResponse } from './responses/error-response';
import { MovieSearcher } from 'src/app/services/movie-searcher';
import { ConfigurationService } from 'src/app/services/configuration-service';
import { MovieService } from 'src/app/services/movie-service';
import { MoviesPage } from 'src/app/models/movies-page';
import { debounceTime } from 'rxjs/operators';

theMovieDb.common.api_key = API_KEY;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  private searchText = '';
  private errorMessage = '';
  private currentPage = 1;

  private moviesPage: MoviesPage = null;
  private pages: number[];

  private dataLoaded = false;
  private errorCaught = false;

  private get isSearTextProvied() {
    return !!this.searchText;
  }

  private get moviesList() {
    return this.dataLoaded ? this.moviesPage.movies : [];
  }

  private get noResults() {
    return this.dataLoaded && !this.errorCaught && this.moviesList.length === 0;
  }

  private get totalPages() {
    if (this.dataLoaded) {
      return this.moviesPage.totalPages;
    }
    return 0;
  }

  constructor(private serive: MovieService) { }

  ngOnInit(): void {
    this.search(this.searchText);
  }

  private search(searchText: string) {
    this.saveSearchText(searchText);
    this.resetPage();
    this.resetError();
    this.loadMovies();
  }

  private loadMovies() {
    if (this.isSearTextProvied) {
      this.searchMovies();
    } else {
      this.showPopular();
    }
  }

  private changePage(page: number) {
    this.currentPage = page;
    this.loadMovies();
  }

  private resetError() {
    this.errorCaught = false;
  }

  private searchMovies() {
    this.serive.searchMovies(this.searchText, this.currentPage)
      .subscribe(moviesPage => this.handleResponse(moviesPage), errorResponse => this.handleError(errorResponse));
  }

  private showPopular() {
    this.serive.getPopular(this.currentPage)
      .subscribe(moviesPage => this.handleResponse(moviesPage), errorResponse => this.handleError(errorResponse));
  }

  private handleError(errorResponse: ErrorResponse) {
    this.errorCaught = true;
    this.errorMessage = errorResponse.errors[0];
  }

  private handleResponse(movies: MoviesPage) {
    this.moviesPage = movies;
    this.dataLoaded = true;
  }

  private saveSearchText(searchText: string) {
    this.searchText = searchText;
  }

  private resetPage() {
    this.currentPage = 1;
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MoviesSearchComponent } from 'src/app/movies-search/movies-search.component';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { MoviesListComponent } from 'src/app/movies-list/movies-list.component';
import { MovieSearcher } from './services/movie-searcher';
import { ConfigurationService } from './services/configuration-service';
import { MovieService } from './services/movie-service';
import { ErrorComponent } from './error/error.component';
import { NoResultsComponent } from 'src/app/no-results/no-results.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesSearchComponent,
    PaginationComponent,
    MoviesListComponent,
    NoResultsComponent,
    ErrorComponent
  ],
  imports: [BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    MovieSearcher,
    ConfigurationService,
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

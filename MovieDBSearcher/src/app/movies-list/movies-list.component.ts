import { Component, Input } from '@angular/core';
import { MovieListItem } from '../models/movies-list-item';

@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})

export class MoviesListComponent {
  @Input() movies: MovieListItem[];
}

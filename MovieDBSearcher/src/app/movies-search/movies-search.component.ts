import { Component, Output, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.css'],
})
export class MoviesSearchComponent implements OnInit {
  @Output() searchTextChanged = new EventEmitter<string>();
  @Input() searchText: string;

  private searchTextChangedInternal = new Subject<string>();

  ngOnInit(): void {
    this.searchTextChangedInternal.pipe(debounceTime(250)).subscribe(() => this.searchTextChanged.emit(this.searchText));
  }
}

import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Output() pageChanged = new EventEmitter<number>();
  @Input() currentPage: number;
  @Input() totalPages: number;

  private get nextPageExists() {
    return this.currentPage < this.totalPages;
  }

  private get previousPageExists() {
    return this.currentPage > 1;
  }

  private goToNextPage() {
    this.currentPage++;
    this.pageChanged.emit(this.currentPage);
  }

  private goToPreviousPage() {
    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }
}

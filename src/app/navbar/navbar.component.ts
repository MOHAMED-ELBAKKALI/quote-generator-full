import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() viewChange = new EventEmitter<'quote' | 'create' | 'list'>();

  showQuoteView() {
    this.viewChange.emit('quote');
  }

  showCreateView() {
    this.viewChange.emit('create');
  }

  showListView() {
    this.viewChange.emit('list');
  }
}
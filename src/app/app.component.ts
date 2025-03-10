import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { QuoteComponent } from './quote/quote.component';
import { CreateComponent } from './create/create.component';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FooterComponent } from './footer/footer.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, QuoteComponent, CreateComponent, CommonModule, ListComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quote-generator';
  view: 'quote' | 'create' | 'list' = 'quote';

  setView(view: 'quote' | 'create' | 'list') {
    this.view = view;
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  quote: string = '';
  author: string = '';
  isLoading: boolean = false;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.getNewQuote();
  }

  getNewQuote() {
    this.isLoading = true;
    this.quoteService.getRandomQuote().subscribe({
      next: (data) => {
        console.log('API Response:', data);
        if (data && data.length > 0 && data[0].q) {
          this.quote = data[0].q;
          this.author = data[0].a ? data[0].a : 'unknown';
        } else {
          this.quote = 'No quote found!';
          this.author = 'unknown';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching quote', err);
        this.quote = 'Failed to load quote. Try again!';
        this.author = 'unknown';
        this.isLoading = false;
      },
    });
  }

  copyQuote() {
    const textToCopy = `${this.quote} - ${this.author}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Quote copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy to clipboard:', error);
        alert('Failed to copy quote. Please try again.');
      });
  }
}
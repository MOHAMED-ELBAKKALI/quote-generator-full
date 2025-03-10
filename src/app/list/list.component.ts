import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  quotes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.http.get('http://localhost:8080/api/quotes').subscribe({
      next: (response: any) => {
        this.quotes = response;
      },
      error: (error) => {
        console.error('Error fetching quotes:', error);
      }
    });
  }

  copyQuote(index: number) {
    if (index >= 0 && index < this.quotes.length) {
      const quote = this.quotes[index];
      const textToCopy = `"${quote.quote}" - ${quote.author}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Quote copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy quote:', err);
        alert('Failed to copy quote. Please try again.');
      });
    }
  }

  deleteQuote(id: number, index: number) {
    if (confirm('Are you sure you want to delete this quote?')) {
      this.http.delete(`http://localhost:8080/api/quotes/${id}`).subscribe({
        next: () => {
          this.quotes.splice(index, 1); // Remove the quote from the local array
          alert('Quote deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting quote:', error);
          alert('Failed to delete quote. Please try again.');
        }
      });
    }
  }
}
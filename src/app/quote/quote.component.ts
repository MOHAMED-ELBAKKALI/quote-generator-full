import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { QuoteService } from '../quote.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  quote: string = '';
  author: string = '';
  isLoading: boolean = false;
  currentQuote: any = null; 
  isEditing: boolean = false; 
  editQuote: any = { q: '', a: '' }; 

  constructor(private quoteService: QuoteService, private http: HttpClient) {}

  ngOnInit() {
    this.getNewQuote();
  }

  getNewQuote() {
    this.isLoading = true;
    this.quoteService.getRandomQuote().subscribe({
      next: (data) => {
        console.log('API Response:', data);
        if (data && data.quote) { // Change to use 'quote' instead of 'q'
          this.currentQuote = data; 
          this.quote = data.quote; 
          this.author = data.author ? data.author : 'unknown'; 
        } else {
          this.quote = 'No quote found!';
          this.author = 'unknown';
          this.currentQuote = null;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching quote', err);
        this.quote = 'Failed to load quote. Try again!';
        this.author = 'unknown';
        this.currentQuote = null;
        this.isLoading = false;
      },
    });
  }

  openUpdateModal() {
    if (this.currentQuote) {
      this.editQuote = { q: this.currentQuote.quote, a: this.currentQuote.author }; 
      this.isEditing = true; 
    }
  }

  updateQuote() {
    if (this.editQuote && this.currentQuote) {
      this.http.put(`http://localhost:8080/api/quotes/${this.currentQuote.id}`, { q: this.editQuote.q, a: this.editQuote.a })
        .subscribe({
          next: (response: any) => {
            this.quote = response.q;
            this.author = response.a || 'unknown';
            this.currentQuote = response; 
            this.isEditing = false; 
            alert('Quote updated successfully!');
          },
          error: (err) => {
            console.error('Error updating quote:', err);
            alert('Failed to update quote. Please try again.');
          }
        });
    }
  }

  cancelUpdate() {
    this.isEditing = false;
    this.editQuote = { q: '', a: '' }; 
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
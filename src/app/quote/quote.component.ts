import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add FormsModule for ngModel
import { QuoteService } from '../quote.service';
import { HttpClient } from '@angular/common/http'; // Add HttpClient for PUT request

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  quote: string = '';
  author: string = '';
  isLoading: boolean = false;
  currentQuote: any = null; // Store the current quote object
  isEditing: boolean = false; // Control modal visibility
  editQuote: any = { q: '', a: '' }; // Store the quote being edited, matching API format

  constructor(private quoteService: QuoteService, private http: HttpClient) {}

  ngOnInit() {
    this.getNewQuote();
  }

  getNewQuote() {
    this.isLoading = true;
    this.quoteService.getRandomQuote().subscribe({
      next: (data) => {
        console.log('API Response:', data);
        if (data && data.length > 0 && data[0].q) {
          this.currentQuote = data[0]; // Store the full quote object
          this.quote = data[0].q;
          this.author = data[0].a ? data[0].a : 'unknown';
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
      this.editQuote = { ...this.currentQuote }; // Create a copy for editing
      this.isEditing = true; // Show the modal
    }
  }

  updateQuote() {
    if (this.editQuote && this.currentQuote) {
      this.http.put(`http://localhost:8080/api/quotes/${this.currentQuote.id}`, { q: this.editQuote.q, a: this.editQuote.a })
        .subscribe({
          next: (response: any) => {
            this.quote = response.q;
            this.author = response.a || 'unknown';
            this.currentQuote = response; // Update the current quote
            this.isEditing = false; // Close the modal
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
    this.isEditing = false; // Close the modal
    this.editQuote = { q: '', a: '' }; // Reset editQuote
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
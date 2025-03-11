import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], 
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  quotes: any[] = [];
  selectedQuote: any = null; 
  selectedIndex: number = -1; 

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
          this.quotes.splice(index, 1); 
          alert('Quote deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting quote:', error);
          alert('Failed to delete quote. Please try again.');
        }
      });
    }
  }

  openUpdateModal(quote: any, index: number) {
    this.selectedQuote = { ...quote };
    this.selectedIndex = index; 
  }

  updateQuote(id: number, index: number) {
    if (this.selectedQuote) {
      this.http.put(`http://localhost:8080/api/quotes/${id}`, this.selectedQuote).subscribe({
        next: (response: any) => {
          this.quotes[index] = response; 
          this.selectedQuote = null; 
          this.selectedIndex = -1; 
          alert('Quote updated successfully!');
        },
        error: (error) => {
          console.error('Error updating quote:', error);
          alert('Failed to update quote. Please try again.');
        }
      });
    }
  }

  cancelUpdate() {
    this.selectedQuote = null; 
    this.selectedIndex = -1; 
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  quoteForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.quoteForm = this.fb.group({
      quote: [''],
      author: ['']
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.quoteForm.valid) {
      const quoteData = this.quoteForm.value;
      this.http.post('http://localhost:8080/api/quotes', quoteData).subscribe({
        next: (response) => {
          alert('Quote saved successfully!');
          this.quoteForm.reset();
        },
        error: (error) => {
          console.error('Error saving quote:', error);
          alert('Failed to save quote. Please try again.');
        }
      });
    }
  }
}
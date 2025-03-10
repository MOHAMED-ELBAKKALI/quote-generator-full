import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = '/api/random';

  constructor(private http: HttpClient) { }

  getRandomQuote(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

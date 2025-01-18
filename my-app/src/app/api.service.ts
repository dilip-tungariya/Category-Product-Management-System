import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/index';  // Your backend URL

  constructor(private http: HttpClient) { }
  post(object: object): Observable<any> {
    return this.http.post(`${this.apiUrl}`, object);
  }
}

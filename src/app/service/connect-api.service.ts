import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConnectApiService {
  private readonly API_URL = 'https://conduit.productionready.io/api';
  // private httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  // };
  constructor(private http: HttpClient) {}

  getTags() {
    return this.http.get<any>(this.API_URL + '/tags');
  }

  // Login
  // Logout
  // Get current user
  // Update user
  // Get profile
  // Follow user
  // Unfollow user
  // List Article
  getArticles() {
    return this.http.get<any>(this.API_URL + '/articles?author=Gerome');
  }
}

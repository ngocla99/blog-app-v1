import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private auth: AuthService) { }

  setAuthorizationHeaders() {
    const token = this.auth.getUserToken();
    const headers = new HttpHeaders({'Authorization': `${token}`});
    return headers;
  }

  followUser(username: any) {
    const headers = this.setAuthorizationHeaders();
    return this.http.post(`${this.apiUrl}/profiles/${username}/follow`, {}, { headers: headers });
  }

  unfollowUser(username: any) {
    const headers = this.setAuthorizationHeaders();
    return this.http.delete(`${this.apiUrl}/profiles/${username}/follow`, { headers: headers });
  }

  getUser() {
    const headers = this.setAuthorizationHeaders();
    return this.http.get(`${this.apiUrl}/user`, { headers: headers });
  }

  editUser(user: any) {
    const headers = this.setAuthorizationHeaders();
    return this.http.put(`${this.apiUrl}/user`, user, { headers: headers });
  }

  
}

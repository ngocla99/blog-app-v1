import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile, UserProfile } from '../shared/model/profile.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  // setAuthorizationHeaders() {
  //   const token = this.auth.getUserToken();
  //   const headers = new HttpHeaders({ Authorization: `${token}` });
  //   return headers;
  // }

  followUser(username: string) {
    const headers = this.auth.setAuthorizationHeaders();
    return this.http.post(
      `${this.apiUrl}/profiles/${username}/follow`,
      {},
      { headers: headers }
    );
  }

  unfollowUser(username: string) {
    const headers = this.auth.setAuthorizationHeaders();
    return this.http.delete(`${this.apiUrl}/profiles/${username}/follow`, {
      headers: headers,
    });
  }

  getUser() {
    const headers = this.auth.setAuthorizationHeaders();
    return this.http.get(`${this.apiUrl}/user`, { headers: headers });
  }

  editUser(user: any) {
    const headers = this.auth.setAuthorizationHeaders();
    return this.http.put(`${this.apiUrl}/user`, user, { headers: headers });
  }

  getUserProfile(username: string) {
    if (this.auth.isLoggedIn()) {
      const headers = this.auth.setAuthorizationHeaders();
      return this.http.get<UserProfile>(`${this.apiUrl}/profiles/${username}`, {
        headers: headers,
      });
    }
    return this.http.get<UserProfile>(`${this.apiUrl}/profiles/${username}`);
  }
}

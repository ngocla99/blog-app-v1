import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../shared/model/profile.model';
import { User, UserData } from '../shared/model/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  followUser(username: string) {
    const headers = this.auth.setAuthorizationHeaders();
    return this.http.post<UserProfile>(
      `${this.apiUrl}/profiles/${username}/follow`,
      {},
      { headers: headers }
    );
  }

  unfollowUser(username: string) {
    const headers = this.auth.setAuthorizationHeaders();
    return this.http.delete<UserProfile>(
      `${this.apiUrl}/profiles/${username}/follow`,
      {
        headers: headers,
      }
    );
  }

  getUser() {
    const headers = this.auth.setAuthorizationHeaders();
    return this.http.get<UserData>(`${this.apiUrl}/user`, { headers: headers });
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

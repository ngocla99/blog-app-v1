import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../shared/model/profile.model';
import { UserData } from '../shared/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient) {}

  followUser(username: string) {
    return this.http.post<UserProfile>(
      `${this.apiUrl}/profiles/${username}/follow`,
      {}
    );
  }

  unfollowUser(username: string) {
    return this.http.delete<UserProfile>(
      `${this.apiUrl}/profiles/${username}/follow`
    );
  }

  getUser() {
    return this.http.get<UserData>(`${this.apiUrl}/user`);
  }

  editUser(user: any) {
    return this.http.put(`${this.apiUrl}/user`, user);
  }

  getUserProfile(username: string) {
    return this.http.get<UserProfile>(`${this.apiUrl}/profiles/${username}`);
  }
}

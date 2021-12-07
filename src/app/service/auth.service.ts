import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiurl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient) { }

  loginUser(user: any) {
    return this.http.post(`${ this.apiurl }/users/login`, user);
  }

  signUpUser(user: any) {
    return this.http.post(`${ this.apiurl }/users`, user);
  }

  setUser(userData: any): void {
    const user = {
      username: userData.username,
      token: `Token ${userData.token}`
    };
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    window.localStorage.removeItem('user');
  }

  getUserName() {
    return JSON.parse(localStorage.getItem('user') || '{}').username;
  }

  getUserToken() {
    return JSON.parse(localStorage.getItem('user') || '{}').token;
  }

  isLoggedIn(): boolean {
    const currentUser = JSON.parse(window.localStorage.getItem('user') || '{}');
    if (currentUser && currentUser.token) {
      return true;
    }
    return false;
  }
}

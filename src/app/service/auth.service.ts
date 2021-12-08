import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiurl = 'https://conduit.productionready.io/api';
  // currentUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  // setData(obj: any) {
  //   this.currentUser.next(obj);
  // }

  loginUser(user: any) {
    return this.http.post(`${this.apiurl}/users/login`, user);
  }

  signUpUser(user: any) {
    return this.http.post(`${this.apiurl}/users`, user);
  }

  setUser(userData: any) {
    const user = {
      username: userData.username,
      token: `Token ${userData.token}`,
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    // this.currentUser.next(userData);
  }

  autoLoad() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '');
      // this.currentUser.next(user);
    } else {
      // this.currentUser.next(null);
    }
    return;
  }

  removeUser() {
    window.localStorage.removeItem('user');
    // this.currentUser.next(null);
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

  setAuthorizationHeaders() {
    const token = this.getUserToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return headers;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiurl = 'https://conduit.productionready.io/api';
  private timeLogout = 1000 * 60 * 10;

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user: any) {
    return this.http.post(`${this.apiurl}/users/login`, user).pipe(
      tap(() => {
        this.autoLogout();
        localStorage.setItem('itemsPerPage', '1');
      })
    );
  }

  signUpUser(user: any) {
    return this.http.post(`${this.apiurl}/users`, user).pipe(
      tap(() => {
        this.autoLogout();
        localStorage.setItem('itemsPerPage', '1');
      })
    );
  }

  autoLogout() {
    setTimeout(() => {
      this.logout();
      Swal.fire('My Blog', 'The login session has expired', 'warning');
    }, this.timeLogout);
  }

  setUser(userData: any) {
    const user = {
      username: userData.username,
      token: `Token ${userData.token}`,
    };
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  autoLoad() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '');
      this.autoLogout();
    } else {
    }
    return;
  }

  logout() {
    this.removeUser();
    this.router.navigateByUrl('/login');
    window.localStorage.removeItem('itemsPerPage');
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

  getPage() {
    return JSON.parse(localStorage.getItem('itemsPerPage') || '{}');
  }
}

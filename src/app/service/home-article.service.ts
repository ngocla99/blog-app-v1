import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeArticleService {

  apiUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private auth: AuthService) { }

  setAuthoriztionHeaders() {
    const token = this.auth.getUserToken();
    const headers = new HttpHeaders({'Authorization': `${token}`});
    return headers;
  }

  getGlobalFeed(offset: any = 0, limit: any = 20) {
    if(this.auth.isLoggedIn()) {
      const headers = this.setAuthoriztionHeaders();
      return this.http.get(`${ this.apiUrl }/articles/?limit=${limit}&offset=${offset}`, {headers: headers});
    }
    return this.http.get(`${ this.apiUrl }/articles/?limit=${limit}&offset=${offset}`);
  }

  getUserFeed(offset: any) {
    const headers = this.setAuthoriztionHeaders();
    return this.http.get(`${ this.apiUrl }/articles/feed/?limit=10&offset=${offset}`, {headers: headers});
  }

  getAuthorArticles(username: any, offset: any) {
    if(this.auth.isLoggedIn()) {
      const headers = this.setAuthoriztionHeaders();
      return this.http.get(`${ this.apiUrl }/articles/?author=${username}&limit=10&offset=${offset}`, {headers: headers});
    }
    return this.http.get(`${ this.apiUrl }/articles/?author=${username}&limit=10&offset=${offset}`);
  }

  getAuthorFavArticles(username: any, offset: any) {
    if(this.auth.isLoggedIn()) {
      const headers = this.setAuthoriztionHeaders();
      return this.http.get(`${ this.apiUrl }/articles/?favorited=${username}&limit=10&offset=${offset}`, {headers: headers});
    }
    return this.http.get(`${ this.apiUrl }/articles/?favorited=${username}&limit=10&offset=${offset}`);
  }

  getTagFeed(tag: any, offset: any) {
    if(this.auth.isLoggedIn()) {
      const headers = this.setAuthoriztionHeaders();
      return this.http.get(`${ this.apiUrl }/articles/?tag=${ tag }&limit=10&offset=${offset}`, {headers: headers});
    }
    return this.http.get(`${ this.apiUrl }/articles/?tag=${ tag }&limit=10&offset=${offset}`);
  }

  getFamousTags() {
    return this.http.get(`${ this.apiUrl }/tags`);
  }
}

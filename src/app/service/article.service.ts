import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  apiUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  setAuthorizationHeaders() {
    const token = this.auth.getUserToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return headers;
  }

  getArticleBySlug(slug: any) {
    if (this.auth.isLoggedIn()) {
      const headers = this.setAuthorizationHeaders();
      return this.http.get(`${this.apiUrl}/articles/${slug}`, {
        headers: headers,
      });
    }
    return this.http.get(`${this.apiUrl}/articles/${slug}`);
  }

  postNewArticle(article: any) {
    const headers = this.setAuthorizationHeaders();
    return this.http.post(`${this.apiUrl}/articles`, article, {
      headers: headers,
    });
  }

  deleteArticle(articleSlug: any) {
    const headers = this.setAuthorizationHeaders();
    return this.http.delete(`${this.apiUrl}/articles/${articleSlug}`, {
      headers: headers,
    });
  }

  favoriteArticle(articleSlug: any) {
    const headers = this.setAuthorizationHeaders();
    return this.http.post(
      `${this.apiUrl}/articles/${articleSlug}/favorite`,
      {},
      { headers: headers }
    );
  }

  unfavoriteArticle(articleSlug: any) {
    const headers = this.setAuthorizationHeaders();
    return this.http.delete(`${this.apiUrl}/articles/${articleSlug}/favorite`, {
      headers: headers,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  apiUrl = 'https://conduit.productionready.io/api';
  pageIndexSub = new Subject<number>();
  likeSub = new Subject();
  constructor(private http: HttpClient) {}

  getArticleBySlug(slug: any) {
    return this.http.get(`${this.apiUrl}/articles/${slug}`);
  }

  postNewArticle(article: any) {
    return this.http.post(`${this.apiUrl}/articles`, article);
  }

  editArticle(article: any, articleSlug: any) {
    return this.http.put(`${this.apiUrl}/articles/${articleSlug}`, article);
  }

  deleteArticle(articleSlug: any) {
    return this.http.delete(`${this.apiUrl}/articles/${articleSlug}`);
  }

  favoriteArticle(articleSlug: any) {
    return this.http.post(
      `${this.apiUrl}/articles/${articleSlug}/favorite`,
      {}
    );
  }

  unfavoriteArticle(articleSlug: any) {
    return this.http.delete(`${this.apiUrl}/articles/${articleSlug}/favorite`);
  }
}

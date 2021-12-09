import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleData } from '../shared/model/article.model';

@Injectable({
  providedIn: 'root',
})
export class HomeArticleService {
  apiUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient) {}

  getGlobalFeed(offset: number = 0, limit: number = 20) {
    return this.http.get<ArticleData>(
      `${this.apiUrl}/articles/?limit=${limit}&offset=${offset}`
    );
  }

  getArticle() {
    return this.http.get(`${this.apiUrl}/articles`);
  }

  getUserFeed(offset: any) {
    return this.http.get(
      `${this.apiUrl}/articles/feed/?limit=10&offset=${offset}`
    );
  }
  /**
   *
   * @param username
   * @param offset
   * @param limit
   * @returns
   */
  getAuthorArticles(
    username: string | undefined,
    offset: number = 0,
    limit: number = 20
  ) {
    return this.http.get<ArticleData>(
      `${this.apiUrl}/articles/?author=${username}&limit=${limit}&offset=${offset}`
    );
  }

  getAuthorFavArticles(
    username: string,
    offset: number = 0,
    limit: number = 20
  ) {
    return this.http.get<ArticleData>(
      `${this.apiUrl}/articles/?favorited=${username}&limit=${limit}&offset=${offset}`
    );
  }

  getTagFeedCount(tag: any, offset: any) {
    return this.http.get(
      `${this.apiUrl}/articles/?tag=${tag}&limit=10&offset=${offset}`
    );
  }

  getTagFeed(tag: any, offset: any, limit: any) {
    return this.http.get(
      `${this.apiUrl}/articles/?tag=${tag}&limit=${limit}&offset=${offset}`
    );
  }

  getFamousTags() {
    return this.http.get(`${this.apiUrl}/tags`);
  }
}

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  apiUrl = 'https://conduit.productionready.io/api';
  deleteEvent = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  getArticleComments(slug: any) {
    return this.http.get(`${this.apiUrl}/articles/${slug}/comments`);
  }

  postArticleComment(slug: any, comment: any) {
    return this.http.post(`${this.apiUrl}/articles/${slug}/comments`, comment);
  }

  deleteArticleComment(slug: any, commentId: any) {
    return this.http.delete(
      `${this.apiUrl}/articles/${slug}/comments/${commentId}`
    );
  }
}

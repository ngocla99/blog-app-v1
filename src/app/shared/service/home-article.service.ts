import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleData } from '../model/article.model';
import { AuthService } from './auth.service';

import * as UI from '../ui.actions';
import * as Home from '../../home/home.actions';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root',
})
export class HomeArticleService {
  private readonly API_URL = 'https://conduit.productionready.io/api';
  private limit = 3;
  private offset = 0;
  pageNumbersSub = new Subject<number[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private articleService: ArticleService,
    private store: Store<fromRoot.State>
  ) {}

  // Get most recent articles globally
  getGlobalFeed(offset: number = 0, limit: number = 20) {
    return this.http.get<ArticleData>(
      `${this.API_URL}/articles/?limit=${limit}&offset=${offset}`
    );
  }

  // Get multiple articles created by followed users
  getUserFeed(offset: number = 0, limit: number = 20) {
    return this.http.get<ArticleData>(
      `${this.API_URL}/articles/feed/?limit=${limit}&offset=${offset}`
    );
  }

  // Get articles by author name
  getAuthorArticles(
    username: string | undefined,
    offset: number = 0,
    limit: number = 20
  ) {
    return this.http.get<ArticleData>(
      `${this.API_URL}/articles/?author=${username}&limit=${limit}&offset=${offset}`
    );
  }

  // Get articles by favorited author
  getAuthorFavArticles(
    username: string,
    offset: number = 0,
    limit: number = 20
  ) {
    return this.http.get<ArticleData>(
      `${this.API_URL}/articles/?favorited=${username}&limit=${limit}&offset=${offset}`
    );
  }

  // Get articles by tag
  getTagFeed(tag: string, offset: number, limit: number) {
    return this.http.get<ArticleData>(
      `${this.API_URL}/articles/?tag=${tag}&limit=${limit}&offset=${offset}`
    );
  }

  // Get tag list
  getTagList() {
    return this.http.get<any>(`${this.API_URL}/tags`);
  }

  /*-----------MANAGE STATE-----------*/
  // Global Feed
  initialGlobalFeed() {
    this.limit = this.authService.getPage();

    this.store.dispatch(new UI.StartLoading());
    this.store.dispatch(new Home.GetCurrentPage(1));

    this.getGlobalFeed(this.offset, this.limit)
      .pipe(
        map((data: ArticleData) => {
          const totalPages = data.articlesCount;
          const pageNumbers = [];
          let pages: number;
          if (totalPages <= 1) {
            pages = 0;
          } else {
            pages = Math.ceil(totalPages / this.limit);
            for (let i = 1; i <= pages; i++) {
              pageNumbers.push(i);
            }
          }

          this.store.dispatch(new Home.GetNumberPages(pageNumbers));
          this.store.dispatch(new UI.StopLoading());

          return data.articles;
        })
      )
      .subscribe((articles) =>
        this.store.dispatch(new Home.GetArticles(articles))
      );

    return this.getArticlesByPage();
  }

  private getArticlesByPage() {
    return this.articleService.pageIndexSub
      .pipe(
        switchMap((pageIndex) => {
          const currentPage = pageIndex + 1;
          this.store.dispatch(new UI.StartLoading());
          this.store.dispatch(new Home.GetCurrentPage(currentPage));

          return this.getGlobalFeed(pageIndex * this.limit, this.limit);
        })
      )
      .subscribe((data: any) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Home.GetArticles(data.articles));
      });
  }

  // User Feed
  initialUserFeed() {
    this.limit = this.authService.getPage();
    this.store.dispatch(new UI.StartLoading());
    this.store.dispatch(new Home.GetCurrentPage(1));

    this.getUserFeed(this.offset, this.limit)
      .pipe(
        map((data) => {
          const totalPages = data.articlesCount;
          let pages;
          const pageNumbers = [];

          if (totalPages <= 1) {
            pages = 0;
          } else {
            pages = Math.ceil(totalPages / this.limit);
            for (let i = 1; i <= pages; i++) {
              pageNumbers.push(i);
            }
          }

          this.store.dispatch(new Home.GetNumberPages(pageNumbers));
          this.store.dispatch(new UI.StopLoading());

          return data.articles;
        })
      )
      .subscribe((articles) => {
        this.store.dispatch(new Home.GetArticles(articles));
      });

    return this.getArticlesUserByPage();
  }

  getArticlesUserByPage() {
    return this.articleService.pageIndexSub
      .pipe(
        switchMap((pageIndex) => {
          const currentPage = pageIndex + 1;

          this.store.dispatch(new UI.StartLoading());
          this.store.dispatch(new Home.GetCurrentPage(currentPage));

          return this.getUserFeed(pageIndex * this.limit, this.limit);
        })
      )
      .subscribe((data: any) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Home.GetArticles(data.articles));
      });
  }

  // Tag Feed
  initialTagFeed(tag: string) {
    this.limit = this.authService.getPage();
    this.store.dispatch(new UI.StartLoading());
    this.store.dispatch(new Home.GetCurrentPage(1));

    this.getTagFeed(tag, this.offset, this.limit)
      .pipe(
        map((data) => {
          const totalPages = data.articlesCount;
          let pages;
          const pageNumbers = [];

          if (totalPages <= 1) {
            pages = 0;
          } else {
            pages = Math.ceil(totalPages / this.limit);
            for (let i = 1; i <= pages; i++) {
              pageNumbers.push(i);
            }
          }

          this.store.dispatch(new Home.GetNumberPages(pageNumbers));
          this.store.dispatch(new UI.StopLoading());

          return data.articles;
        })
      )
      .subscribe((articles) => {
        this.store.dispatch(new Home.GetArticles(articles));
      });

    return this.getArticlesTagByPage(tag);
  }

  getArticlesTagByPage(tag: string) {
    return this.articleService.pageIndexSub
      .pipe(
        switchMap((pageIndex) => {
          const currentPage = pageIndex + 1;

          this.store.dispatch(new UI.StartLoading());
          this.store.dispatch(new Home.GetCurrentPage(currentPage));

          return this.getTagFeed(tag, pageIndex * this.limit, this.limit);
        })
      )
      .subscribe((data: any) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Home.GetArticles(data.articles));
      });
  }
}

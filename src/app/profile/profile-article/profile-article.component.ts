import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ArticleService } from 'src/app/service/article.service';
import { AuthService } from 'src/app/service/auth.service';
import { HomeArticleService } from 'src/app/service/home-article.service';
import { Article } from 'src/app/shared/model/article.model';

@Component({
  selector: 'app-profile-article',
  templateUrl: './profile-article.component.html',
  styleUrls: ['./profile-article.component.css'],
})
export class ProfileArticleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() authorName: string | undefined;
  username!: string;
  articles!: Article[];
  limit = 2; // limit, can changes by settings.
  offset = 0;
  totalPages: number[] = [];
  pageIndexSub$!: Subscription;
  pageIndex!: number;
  constructor(
    private homeArticleService: HomeArticleService,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUserName();
    this.getArticles();

    this.pageIndexSub$ = this.articleService.pageIndexSub
      .pipe(
        switchMap((pageIndex) => {
          return this.homeArticleService.getAuthorArticles(
            this.authorName,
            pageIndex * this.limit,
            this.limit
          );
        })
      )
      .subscribe((data) => {
        this.articles = data.articles;
      });
  }

  ngOnChanges() {
    this.getArticles();
  }

  getArticles() {
    this.homeArticleService
      .getAuthorArticles(this.authorName, this.offset, this.limit)
      .subscribe((data) => {
        this.articles = data.articles;
        const articlesCount = data.articlesCount;
        const numberPages = Math.ceil(articlesCount / this.limit);
        for (let i = 1; i <= numberPages; i++) {
          this.totalPages.push(i);
        }
      });
  }

  ngOnDestroy(): void {
    this.pageIndexSub$.unsubscribe();
  }
}

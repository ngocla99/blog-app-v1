import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ArticleService } from 'src/app/service/article.service';
import { HomeArticleService } from 'src/app/service/home-article.service';
import { Article } from 'src/app/shared/model/article.model';

@Component({
  selector: 'app-profile-favorite',
  templateUrl: './profile-favorite.component.html',
  styleUrls: ['./profile-favorite.component.css'],
})
export class ProfileFavoriteComponent implements OnInit {
  userName!: string;
  articles!: Article[];
  limit = 2; // limit, can changes by settings.
  offset = 0;
  totalPages: number[] = [];
  pageIndexSub$!: Subscription;
  pageIndex!: number;
  constructor(
    private homeArticleService: HomeArticleService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.router.url.split('/')[2];
    console.log(this.userName);
    this.homeArticleService
      .getAuthorFavArticles(this.userName, this.offset, this.limit)
      .subscribe((data) => {
        this.articles = data.articles;
        const articlesCount = data.articlesCount;
        const numberPages = Math.ceil(articlesCount / this.limit);
        for (let i = 1; i <= numberPages; i++) {
          this.totalPages.push(i);
        }
      });

    this.articleService.likeSub
      .pipe(
        switchMap(() =>
          this.homeArticleService.getAuthorFavArticles(
            this.userName,
            this.offset,
            this.limit
          )
        )
      )
      .subscribe((data) => {
        this.articles = data.articles;
        const articlesCount = data.articlesCount;
        this.totalPages = [];
        const numberPages = Math.ceil(articlesCount / this.limit);
        for (let i = 1; i <= numberPages; i++) {
          this.totalPages.push(i);
        }
      });

    this.pageIndexSub$ = this.articleService.pageIndexSub
      .pipe(
        switchMap((pageIndex) => {
          return this.homeArticleService.getAuthorFavArticles(
            this.userName,
            pageIndex * this.limit,
            this.limit
          );
        })
      )
      .subscribe((data) => {
        this.articles = data.articles;
      });
  }

  ngOnDestroy(): void {
    this.pageIndexSub$.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { HomeArticleService } from 'src/app/service/home-article.service';
import { Article } from 'src/app/shared/model/article.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css'],
})
export class GlobalComponent implements OnInit {
  list: Article[] = [];
  limit: number = 1;
  offset: number = 0;
  totalPages: any;
  pages!: number;
  pageNumbers: number[] = [];
  isLoading: boolean = false;
  constructor(
    private getArticle: HomeArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.limit = this.authService.getPage();
    this.isLoading = true;

    this.getArticle.getArticle().subscribe((data: any) => {
      this.totalPages = data.articlesCount;
      if (this.totalPages <= 1) {
        this.pages = 0;
      } else {
        this.pages = Math.ceil(this.totalPages / this.limit);
        for (let i = 1; i <= this.pages; i++) {
          this.pageNumbers.push(i);
        }
      }
    });

    this.getArticle
      .getGlobalFeed(this.offset, this.limit)
      .subscribe((data: any) => {
        this.isLoading = false;
        this.list = data.articles;
      });
  }

  changePage(value: number) {
    this.isLoading = true;
    if (value === 1) {
      this.getArticle
        .getGlobalFeed(this.offset, this.limit)
        .subscribe((data: any) => {
          this.isLoading = false;
          this.list = data.articles;
        });
    } else {
      this.getArticle
        .getGlobalFeed(this.limit * (value - 1), this.limit)
        .subscribe((data: any) => {
          this.isLoading = false;
          this.list = data.articles;
        });
    }
  }
}

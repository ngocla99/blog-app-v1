import { AuthService } from 'src/app/service/auth.service';
import { Article } from './../../shared/model/article.model';
import { HomeArticleService } from './../../service/home-article.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  @Input() tags: any;
  limit: number = 1;
  offset: number = 0;
  totalPages: any;
  pages!: number;
  list: Article[] = [];
  isLoading: boolean = false;
  pageNumbers: number[] = [];

  constructor(
    private getArticle: HomeArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.limit = this.authService.getPage();
    this.isLoading = true;
    this.getArticle
      .getTagFeedCount(this.tags, this.offset)
      .subscribe((data: any) => {
        this.isLoading = false;
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
      .getTagFeed(this.tags, this.offset, this.limit)
      .subscribe((data: any) => {
        this.list = data.articles;
      });
  }

  changePage(value: number) {
    this.isLoading = true;
    if (value == 1) {
      this.getArticle
        .getTagFeed(this.tags, this.offset, this.limit)
        .subscribe((data: any) => {
          this.isLoading = false;
          this.list = data.articles;
        });
    } else {
      this.getArticle
        .getTagFeed(this.tags, this.limit * (value - 1), this.limit)
        .subscribe((data: any) => {
          this.isLoading = false;
          this.list = data.articles;
        });
    }
  }
}

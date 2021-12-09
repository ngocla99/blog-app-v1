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

  pageNumbers: number[] = [];

  constructor(
    private getArticle: HomeArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.limit = this.authService.getPage();
    console.log(this.limit);

    this.getArticle
      .getTagFeedCount(this.tags, this.offset)
      .subscribe((data: any) => {
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
    if (value == 1) {
      this.getArticle
        .getTagFeed(this.tags, this.offset, this.limit)
        .subscribe((data: any) => {
          this.list = data.articles;
          console.log(this.list);
        });
    } else {
      this.getArticle
        .getTagFeed(this.tags, this.limit * (value - 1), this.limit)
        .subscribe((data: any) => {
          this.list = data.articles;
          console.log(data);
        });
    }
  }
}

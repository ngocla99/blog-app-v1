import { Article } from './../../shared/model/article.model';
import { Component, OnInit } from '@angular/core';
import { HomeArticleService } from 'src/app/shared/service/home-article.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  list: Article[] = [];
  // limit: number = 1;
  // offset: number = 0;

  // isLoading: boolean = false;

  emptyPage: boolean = false;
  constructor(
    private homeArticleService: HomeArticleService,
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.homeArticleService.initialUserFeed();
    // this.limit = this.authService.getPage();
    // this.isLoading = true;

    // this.homeArticleService.getUserFeed().subscribe((data: any) => {
    //   const totalPages = data.articlesCount;
    //   let pages;
    //   const pageNumbers = [];
    //   this.emptyPage = totalPages === 0 ? true : false;
    //   if (totalPages <= 1) {
    //     pages = 0;
    //   } else {
    //     pages = Math.ceil(totalPages / this.limit);
    //     for (let i = 1; i <= pages; i++) {
    //       pageNumbers.push(i);
    //     }
    //   }
    // });

    // this.homeArticleService
    //   .getUserFeed(this.offset, this.limit)
    //   .subscribe((data: any) => {
    //     this.isLoading = false;
    //     this.list = data.articles;
    //   });
  }

  // changePage(value: number) {
  //   this.isLoading = true;
  //   if (value === 1) {
  //     this.homeArticleService
  //       .getUserFeed(this.offset, this.limit)
  //       .subscribe((data: any) => {
  //         this.isLoading = false;
  //         this.list = data.articles;
  //       });
  //   } else {
  //     this.homeArticleService
  //       .getUserFeed(this.limit * (value - 1), this.limit)
  //       .subscribe((data: any) => {
  //         this.isLoading = false;
  //         this.list = data.articles;
  //       });
  //   }

  // }
}

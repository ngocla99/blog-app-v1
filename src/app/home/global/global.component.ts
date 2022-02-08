import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/model/article.model';
import { HomeArticleService } from 'src/app/shared/service/home-article.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css'],
})
export class GlobalComponent implements OnInit {
  articles$!: Observable<Article[]>;
  isLoading$!: Observable<boolean>;
  currentPage$!: Observable<number>;

  pageNumbers: number[] = [];
  emptyPage: boolean = false;
  subscription!: Subscription;
  constructor(
    private homeArticleService: HomeArticleService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.subscription = this.homeArticleService.initialGlobalFeed();

    this.articles$ = this.store.select(fromRoot.getArticles);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.currentPage$ = this.store.select(fromRoot.getCurrentPage);

    const subscription1$ = this.store
      .select(fromRoot.getNumberPages)
      .subscribe((pageNumbers) => {
        this.emptyPage = pageNumbers.length === 0 ? true : false;
        this.pageNumbers = pageNumbers;
      });

    this.subscription.add(subscription1$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

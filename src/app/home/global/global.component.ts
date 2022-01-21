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
  pageNumbers: number[] = [];
  currentPage$!: Observable<number>;

  subscription!: Subscription;

  constructor(
    private homeArticleService: HomeArticleService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.homeArticleService.initialGlobalFeed();

    this.articles$ = this.store.select(fromRoot.getArticles);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.currentPage$ = this.store.select(fromRoot.getCurrentPage);
    this.subscription = this.store
      .select(fromRoot.getNumberPages)
      .subscribe((pageNumbers) => (this.pageNumbers = pageNumbers));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

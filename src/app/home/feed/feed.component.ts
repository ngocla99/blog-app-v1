import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HomeArticleService } from 'src/app/shared/service/home-article.service';
import * as fromRoot from '../../app.reducer';
import { Article } from './../../shared/model/article.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit, OnDestroy {
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
    this.subscription = this.homeArticleService.initialUserFeed();

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

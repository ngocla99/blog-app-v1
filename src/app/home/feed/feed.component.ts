import { HomeArticleService } from './../../service/home-article.service';
import { Article } from './../../shared/model/article.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  list: Article[] = [];

  constructor(private feed: HomeArticleService) {}

  ngOnInit(): void {
    this.feed.getUserFeed(0).subscribe((data) => {
      console.log(data);
    });
  }
}

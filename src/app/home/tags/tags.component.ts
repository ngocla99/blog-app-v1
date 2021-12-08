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
  list: Article[] = [];
  constructor(private getArticle: HomeArticleService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.getArticle.getTagFeed(this.tags, 0).subscribe((data: any) => {
      this.list = data.articles;
    });
  }
}

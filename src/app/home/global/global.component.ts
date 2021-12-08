import { Component, OnInit } from '@angular/core';
import { HomeArticleService } from 'src/app/service/home-article.service';
import { Article } from 'src/app/shared/model/article.model';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {
  list: Article[] = [];
  constructor(private getArticle : HomeArticleService) { }

  ngOnInit(): void {
    this.getArticle.getGlobalFeed().subscribe((data : any) => {
      this.list = data.articles;
      console.log(this.list)
    });
  }

}

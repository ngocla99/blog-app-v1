import { Component, OnInit } from '@angular/core';
import { HomeArticleService } from 'src/app/service/home-article.service';

@Component({
  selector: 'app-profile-article',
  templateUrl: './profile-article.component.html',
  styleUrls: ['./profile-article.component.css'],
})
export class ProfileArticleComponent implements OnInit {
  listArticle: any;
  constructor(private homeArticleService: HomeArticleService) {}

  ngOnInit(): void {}
}

import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeArticleService } from '../service/home-article.service';
import { Article, ArticleData } from '../shared/model/article.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tagMode = false;
  ViewMode: 'global' | 'tags' | 'feed' = 'global';
  tags = ['welcome', 'introduction', 'codebaseShow', 'implementations'];
  tagsValue = '';
  mostLikes: any[] = [];
  public screenWidth: any;
  public screenHeight: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private getArticle: HomeArticleService
  ) {}

  ngOnInit(): void {
    this.getArticle.getGlobalFeed().subscribe((data: any) => {
      this.mostLikes = data.articles
        .sort((a: any, b: any) => {
          return a.favoritesCount - b.favoritesCount;
        })
        .reverse();
    });
  }

  changeViewMode() {
    this.tagMode = false;
    this.ViewMode = 'global';
  }

  sendTag(value: string): void {
    this.tagsValue = value;
    this.tagMode = true;
    this.ViewMode = 'tags';
    if (window.innerWidth > 767) {
      window.scrollTo(0, 600);
    } else if (window.innerWidth <= 767) {
      window.scrollTo(0, 200);
    }
  }

  changeFeedMode() {
    if (this.auth.isLoggedIn()) {
      this.tagMode = false;
      this.ViewMode = 'feed';
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }
}

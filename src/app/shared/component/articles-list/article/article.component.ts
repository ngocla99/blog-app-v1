import { ArticleService } from './../../../../service/article.service';
import { AuthService } from './../../../../service/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  @Input() article: any;
  tagLists: string[] = [];
  favorited!: boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.favorited = this.article.favorited;
    this.tagLists = this.article.tagList;
  }

  onLike(value: any) {
    if (this.auth.isLoggedIn()) {
      this.articleService.favoriteArticle(value).subscribe((data) => {
        this.article = data.article;
        this.favorited = true;
        this.articleService.likeSub.next();
      });
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

  onUnLike(value: any) {
    if (this.auth.isLoggedIn()) {
      this.articleService.unfavoriteArticle(value).subscribe((data) => {
        this.article = data.article;
        this.favorited = false;
        this.articleService.likeSub.next();
      });
    } else {
      this.router.navigateByUrl('login');
    }
  }
}

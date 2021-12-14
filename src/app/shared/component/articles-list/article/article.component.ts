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
  listImg = [
    'https://1.bp.blogspot.com/-hN0NCoAmEDY/X8z1OcRjXmI/AAAAAAAAlc0/hHqbHzqOPhIABiVomzpYacPeEufV816QQCNcBGAsYHQ/s0/hinh-nen-may-cuc-dep.jpg',
    'https://cohet.vn/upload/data/images/BACKGROUND-%202-TECK/hinh-nen-one-piece_102505879.jpg',
    'https://suachualaptop24h.com/upload_images/images/2021/05/02/hinh-nen-laptop-anime-min.jpg',
    'https://suachualaptop24h.com/upload_images/images/2021/04/21/top-3-trang-web-cung-cap-hinh-nen-dep-cho-may-tinh-chat-luong-full-hd-3.jpg',
    'http://khanhkhiem.com/wp-content/uploads/2017/12/hinh-nen-vu-tru-galaxy-17.jpg',
  ];
  img: string = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.favorited = this.article.favorited;
    this.tagLists = this.article.tagList;
    this.img = this.listImg[Math.floor(Math.random() * this.listImg.length)];
  }

  onLike(value: any) {
    if (this.auth.isLoggedIn()) {
      this.articleService.favoriteArticle(value).subscribe((data) => {
        this.article = data.article;
        this.favorited = true;
        this.articleService.likeSub.next();
      });
    } else {
      this.router.navigateByUrl('login');
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

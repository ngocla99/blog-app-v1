import { AuthService } from './../../../../service/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/model/article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() listArticle: any;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLike(value: any) {
    if (this.auth.isLoggedIn()) {
      console.log(value + 1);
    } else {
      this.router.navigateByUrl("sign");
    }
  }
}

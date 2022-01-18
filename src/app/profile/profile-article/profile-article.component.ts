import { Component, Input, OnInit } from '@angular/core';

import { Article } from 'src/app/shared/model/article.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-profile-article',
  templateUrl: './profile-article.component.html',
  styleUrls: ['./profile-article.component.css'],
})
export class ProfileArticleComponent implements OnInit {
  @Input() authorName: string | undefined;

  username!: string;
  articles!: Article[];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUserName();
  }
}

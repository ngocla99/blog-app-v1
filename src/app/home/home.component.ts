import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  changeViewMode() {
    this.tagMode = false;
    this.ViewMode = 'global';
  }

  sendTag(value: string): void {
    this.tagsValue = value;
    this.tagMode = true;
    this.ViewMode = 'tags';
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

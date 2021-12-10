import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserInfo } from '../shared/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user!: UserInfo;
  constructor(
    private authService: AuthService, // private route: ActivatedRoute, // private router: Router
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.getProfile();
    }
  }

  getProfile() {
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data.user;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get isLogin() {
    return this.authService.isLoggedIn();
  }

  get currentUser(): string {
    return this.authService.getUserName();
  }
}

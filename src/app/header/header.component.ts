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
    this.getProfile();
  }

  getProfile() {
    this.userService.getUser().subscribe(
      (data) => {
        console.log(data);

        this.user = data.user;
      },
      (err) => {
        console.log(err);
      },
      () => {
        // this.isLoading = false;
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

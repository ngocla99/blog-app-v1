import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from '../shared/model/profile.model';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile!: Profile;
  usernameSub!: Subscription;
  isLoggedIn!: boolean;
  isUser!: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.usernameSub = this.route.params
      .pipe(
        switchMap((params) => {
          const username = params['username'];
          if (username === this.authService.getUserName()) {
            this.isUser = true;
          } else {
            this.isUser = false;
          }
          return this.userService.getUserProfile(username);
        })
      )
      .subscribe((user) => {
        this.profile = user.profile;
      });
  }

  onFollow() {
    if (!this.isLoggedIn) {
      // this.router.navigate(['/auth/login']);
      Swal.fire({
        title: 'You must login !!!',
        confirmButtonText: 'Go to login',
        confirmButtonColor: '#ff416c',
        timer: 2500,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/auth/login');
        }
      });
      return;
    }
    if (!this.profile.following) {
      this.userService.followUser(this.profile.username).subscribe((data) => {
        this.profile = data.profile;
      });
    }

    if (this.profile.following) {
      this.userService.unFollowUser(this.profile.username).subscribe((data) => {
        this.profile = data.profile;
      });
    }
  }

  ngOnDestroy(): void {
    this.usernameSub.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from '../shared/model/profile.model';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile!: Profile;
  usernameSub!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.usernameSub = this.route.params
      .pipe(
        switchMap((params) => {
          const username = params['username'];
          return this.userService.getUserProfile(username);
        })
      )
      .subscribe((user) => {
        this.profile = user.profile;
        console.log(this.profile);
      });
  }

  onFollow() {
    if (!this.profile.following) {
      this.userService.followUser(this.profile.username).subscribe((data) => {
        console.log(data);
      });
    }

    if (this.profile.following) {
      this.userService.unfollowUser(this.profile.username).subscribe((data) => {
        console.log(data);
      });
    }
  }

  ngOnDestroy(): void {
    this.usernameSub.unsubscribe();
  }
}

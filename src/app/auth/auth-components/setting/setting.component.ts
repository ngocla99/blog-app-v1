import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';
import { User, UserInfo } from '../../../shared/model/user.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  user!: UserInfo;
  resultsPerPage = '0';
  // isLoading!: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfile();
    // this.resultsPerPage = this.authService.getPage();
    // console.log(this.resultsPerPage);
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

  onSubmit(userFormValue: any) {
    //this.authService.settingUser(this.updateEmailLogin);
    this.userService.editUser({ user: userFormValue }).subscribe(
      (data: { user?: User }) => {
        this.authService.setUser(data.user);
        this.router.navigate(['/profile', data.user!.username]);
        Swal.fire('My Blog', 'Update user success!!!', 'success');
      },
      (err) => {
        Swal.fire('My Blog', 'Update user fail!!!', 'error');
        const errorMsg = err.error.errors;
        const statusCode = err.status;
        if (statusCode === 422) {
          console.log(`422`);
        } else if (statusCode === 404) {
          console.log(`404 : Not Found`);
        } else if (statusCode === 401) {
          console.log(`401 : Unauthorized Access`);
        } else if (statusCode === 403) {
          console.log(`403 : Forbidden Access`);
        }
      },
      () => {}
    );
  }

  onPageChoose() {
    if (this.resultsPerPage && this.resultsPerPage !== '0') {
      localStorage.setItem('itemsPerPage', this.resultsPerPage);
      this.router.navigateByUrl('/');
    }
    console.log(this.resultsPerPage);
  }

  logout() {
    this.authService.logout();
  }
}

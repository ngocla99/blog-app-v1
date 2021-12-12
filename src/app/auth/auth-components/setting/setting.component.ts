import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isLoading: boolean = false;
  updateUser!: string | null;
  logoutUser!: string | null;
  userForm: any;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.isLoading = true;
    this.userService.getUser().subscribe(
      (data) => {
        this.isLoading = false;
        this.user = data.user;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(userFormValue: UserInfo) {
    // this.isLoading = true;
    this.updateUser = 'Are you sure update your information?';
    this.userForm = userFormValue;
  }

  onPageChoose() {
    if (this.resultsPerPage && this.resultsPerPage !== '0') {
      localStorage.setItem('itemsPerPage', this.resultsPerPage);
      this.router.navigateByUrl('/');
    }
  }

  logout() {
    this.logoutUser = 'Are you sure logout?';
  }

  onHandleUpdate() {
    // this.isLoading = true;
    this.userService.editUser({ user: this.userForm }).subscribe(
      (data) => {
        this.isLoading = false;
        this.authService.setUser(data.user);
        this.authService.updateUser.next(data.user);
        this.router.navigate(['/profile', data.user.username]);
        Swal.fire('My Blog', 'Update user success!!!', 'success');
      },
      (err) => {
        const errorMsg = err.error.slice(42, err.error.length - 2);
        Swal.fire('My Blog', errorMsg + ' has already been taken', 'error');
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

  onHandleLogout() {
    this.authService.logout();
  }

  onHandleClose() {
    this.updateUser = null;
    this.logoutUser = null;
  }
}

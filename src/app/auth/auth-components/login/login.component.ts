import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {}

  /**
   * Accept formLogin.value as user.email and user.password => call loginUser() from AuthService
   * @param user
   */
  onLogin(user: any) {
    this.isLoading = true;
    this.authService
      .loginUser({ user: user })
      .pipe(
        switchMap((data) => {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
          this.authService.setUser(data.user);
          this.isLoading = false;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Login success!!!',
          });
          return this.userService.getUser();
        }),
        catchError((err) => {
          // handle e and return a safe value or re-throw
          this.router.navigateByUrl('/auth/login');
          const errorMsg = err.error.errors;
          const swalError = Object.keys(errorMsg)
            .map((errItem) => errItem)
            .join(' & ');
          this.isLoading = false;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'error',
            title: swalError + ' is invalid',
          });
          const statusCode = err.status;
          if (statusCode === 404) {
            console.log(`404 : Not Found`);
          } else if (statusCode === 401) {
            console.log(`401 : Unauthorized Access`);
          } else if (statusCode === 403) {
            console.log(`403 : Forbidden Access`);
          }
          return of([]);
        })
      )
      .subscribe((item: any) => {
        //set currentUser for header
        this.authService.setCurrentUser(item.user);
      });
  }
}

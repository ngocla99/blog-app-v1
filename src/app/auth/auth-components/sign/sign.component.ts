import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { User, UserSignUp } from '../../../shared/model/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
})
export class SignComponent implements OnInit {
  loginForm: boolean = false;
  signupForm: boolean = true;
  isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  /**
   * Accept formSignup.value as UserSignup => call signUpUser() from AuthService
   * @param userSignup
   */
  onSignup(userSignup: UserSignUp) {
    this.isLoading = true;
    this.authService.signUpUser({ user: userSignup }).subscribe(
      (data) => {
        this.router.navigate(['/']);
        this.isLoading = false;
        this.authService.setUser(data.user);
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
          title: 'Sign-up success!!!',
        });
      },
      (err) => {
        this.isLoading = false;
        const errorMsg = err.error.errors;
        const swalError = Object.keys(errorMsg)
          .map((errItem) => errItem)
          .join(' & ');
        console.log(swalError);
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
          title: swalError + ' has already been taken',
        });
        const statusCode = err.status;
        this.router.navigateByUrl('/auth/sign-up');
        if (statusCode === 422) {
          console.log(`422 : `);
        } else if (statusCode === 404) {
          console.log(`404 : Not Found`);
        } else if (statusCode === 401) {
          console.log(`401 : Unauthorized Access`);
        } else if (statusCode === 403) {
          console.log(`403 : Forbidden Access`);
        }
      }
    );
  }
}

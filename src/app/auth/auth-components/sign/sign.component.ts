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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sign-up success!!!',
          showConfirmButton: false,
          timer: 1500,
          // color: '#ffffff',
          // background:
          //   'linear-gradient(to right, #fe4f70 0%, #ffa387 51%, #fe4f70 100%)',
        });
      },
      (err) => {
        this.isLoading = false;
        const errorMsg = err.error.errors;
        const swalError = Object.keys(errorMsg)
          .map((errItem) => errItem)
          .join(' & ');
        console.log(swalError);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: swalError + ' has already been taken',
          showConfirmButton: false,
          timer: 1500,
          // color: '#ffffff',
          // background:
          //   'linear-gradient(to right, #fe4f70 0%, #ffa387 51%, #fe4f70 100%)',
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

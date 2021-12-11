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

  onSignup(userSignup: UserSignUp) {
    this.isLoading = true;
    this.authService.signUpUser({ user: userSignup }).subscribe(
      (data) => {
        this.isLoading = false;
        this.authService.setUser(data.user);
        this.router.navigate(['/']);
        Swal.fire('My Blog', 'Sign-up success!!!', 'success');
      },
      (err) => {
        this.isLoading = false;
        const errorMsg = err.error.errors;
        const swalError = Object.keys(errorMsg)
          .map((errItem) => errItem)
          .join(' & ');
        console.log(swalError);
        Swal.fire('My Blog', swalError + ' has already been taken', 'error');
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

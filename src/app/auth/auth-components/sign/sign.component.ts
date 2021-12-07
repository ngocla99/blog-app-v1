import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { User } from '../../../shared/model/user.model';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
<<<<<<< HEAD
  loginForm:boolean=false;
  signupForm:boolean=true;
  constructor(private authService: AuthService, private router: Router) { }
=======
  loginForm: boolean = false;
  signupForm: boolean = true;
  constructor() { }
>>>>>>> 37432739d99c9de6bca113fda879432cea9f9aa8

  ngOnInit() {
  }

<<<<<<< HEAD
  onSignup(userSignup: any) {
    this.authService.signUpUser({ user: userSignup }).subscribe(
      (data: {user?: User}) => {
        this.authService.setUser(data.user);
        this.router.navigate(['/']);
      },
      err => {
        const errorMsg = err.error.errors;
        const statusCode = err.status;
        if (statusCode === 422) {
          console.log(`422 : `);
        } else if (statusCode === 404) {
          console.log(`404 : Not Found`);
        } else if (statusCode === 401) {
          console.log(`401 : Unauthorized Access`);
        } else if (statusCode === 403) {
          console.log(`403 : Forbidden Access`);
        }
      },
      () => { console.log('COMPLETED Signup'); }
    );
=======
  toggleTag() {
    this.loginForm = !this.loginForm;
    this.signupForm = !this.signupForm;
>>>>>>> 37432739d99c9de6bca113fda879432cea9f9aa8
  }
}

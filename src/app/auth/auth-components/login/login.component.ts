import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { User } from '../../../shared/model/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(user: any) {
    this.isLoading = true;
    this.authService.loginUser({ user: user }).subscribe(
      (data) => {
        this.isLoading = false;
        this.authService.setUser(data.user);
        Swal.fire('My Blog', 'Login success!!!', 'success');
        this.router.navigate(['/']);
      },
      (err) => {
        this.isLoading = false;
        this.router.navigateByUrl('/auth/login');
        const errorMsg = err.error.errors;
        const swalError = Object.keys(errorMsg)
          .map((errItem) => errItem)
          .join(' & ');
        console.log(swalError);
        Swal.fire('My Blog', swalError + ' is invalid', 'error');
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
      }
    );
  }
}

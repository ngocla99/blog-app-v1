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
        this.router.navigate(['/']);
        this.authService.setUser(data.user);
        this.isLoading = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login success!!!',
          showConfirmButton: false,
          timer: 1500,
          color: '#ffffff',
          background:
            'linear-gradient(to right, #fe4f70 0%, #ffa387 51%, #fe4f70 100%)',
        });
      },
      (err) => {
        this.router.navigateByUrl('/auth/login');
        const errorMsg = err.error.errors;
        const swalError = Object.keys(errorMsg)
          .map((errItem) => errItem)
          .join(' & ');
        console.log(swalError);
        this.isLoading = false;
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: swalError + ' is invalid',
          showConfirmButton: false,
          timer: 2000,
          color: '#ffffff',
          background:
            'linear-gradient(to right, #fe4f70 0%, #ffa387 51%, #fe4f70 100%)',
        });
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

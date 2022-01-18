import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor(private router: Router) {}

  goToLogin() {
    Swal.fire({
      title: 'You must login !!!',
      confirmButtonText: 'Go to login',
      confirmButtonColor: '#ff416c',
      timer: 2500,
      timerProgressBar: true,
    }).then((result) => {
      const returnUrl = this.router.url;
      if (result.isConfirmed) {
        this.router.navigate(['/auth/login'], {
          queryParams: { returnUrl: returnUrl },
        });
      }
    });
  }

  interact(icon: string, title: string, customIcon = false) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    if (customIcon) {
      Toast.fire({
        iconHtml: `<i class="fas ${icon}" style="font-size: 15px; color:#fe4f70"></i>`,
        title: `${title} !!!`,
      });
    } else {
      Toast.fire({
        icon: 'success',
        title: `${title} !!!`,
      });
    }
  }

  delete() {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#273043',
      cancelButtonColor: '#DC3545',
      confirmButtonText: 'Yes, delete it!',
    });
  }

  deleteSucceeded() {
    Swal.fire({
      title: 'Deleted!',
      text: 'Your file has been deleted.',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#273043',
    });
  }
}

// sweet-alert.service.ts

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor(private router: Router) { }

  // success(message: string) {
  //   Swal.fire('Success', message, 'success');
  // }

  success(message: string, navigateTo?: string) {
    Swal.fire('Success', message, 'success').then((result) => {
      if (result.isConfirmed && navigateTo) {
        this.router.navigateByUrl(navigateTo);
      }
    });
  }

  error(message: string) {
    Swal.fire('Error', message, 'error');
  }

  warning(message: string) {
    Swal.fire('Warning', message, 'warning');
  }

  info(message: string) {
    Swal.fire('Info', message, 'info');
  }

  confirm(message: string): Promise<any> {
    return Swal.fire({
      title: 'Confirm',
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    });
  }
}

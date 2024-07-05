import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { SharedService } from '../service/shared.service';
import { Router } from '@angular/router';
import { SweetAlertService } from '../service/sweet-alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private sharedService: SharedService, private router: Router, private sweetAlertService: SweetAlertService){}

  ngOnInit(){
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },{
      validators: this.password.bind(this)
    })
  }

  password(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  onSubmit(){
    if(this.registerForm.valid){
        this.sharedService.registersaveFormData(this.registerForm.value);
        this.registerForm.reset();
        this.sweetAlertService.success('Successfully registered', '/login');
        // this.router.navigate(['/login'])
    } else{
      this.registerForm.markAllAsTouched();
    }
  }

}

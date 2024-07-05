import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../service/shared.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  userForm!: FormGroup;
  

  @Input() title: string = '';
  @Input() body: string = '';
  @Output() confirmed = new EventEmitter();

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private sharedService: SharedService){}
  
    close() {
      this.confirmed.emit();
      this.activeModal.close('Close button clicked');
    }
  
    confirm() {
      this.confirmed.emit();
      this.activeModal.close('Confirm button clicked');
    }

    ngOnInit(): void {
      this.initForm();
    }

    initForm(): void{
      this.userForm = this.formBuilder.group({
        uuid: [uuidv4()],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber:['', [Validators.required]],
        bloodGroup: ['', [Validators.required]],
        lastDonateDate: ['', [Validators.required]],
      })
    }
    

    onSubmit(): void{
      if(this.userForm.valid){
        // console.log('Form Submitted', this.userForm.value);
        // this.formSubmission.push(this.userForm.value);
        // this.sharedService.saveFormData(this.formSubmission);
        this.sharedService.saveFormData(this.userForm.value);
        this.userForm.reset();
        this.close();

      } else{
        console.log('Form is invalid');
      }
    }

   

}

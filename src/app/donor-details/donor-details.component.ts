import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrl: './donor-details.component.css'
})
export class DonorDetailsComponent implements OnInit {

  getUUID: any;
  getStoreData:any = [];
  filterRecord:any;
  
  editDetailsRecord:boolean = true;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ){

  }
    
  ngOnInit(){
    this.getUUID = this.route.snapshot.paramMap.get('id');
    this.sharedService.getFormData().subscribe(formData => {
      this.getStoreData = formData;
      this.filterRecord = this.getStoreData.filter((record:any) => record.uuid === this.getUUID)
      console.log(this.filterRecord);
    })
  }

  editDetails(){
    this.editDetailsRecord = !this.editDetailsRecord;
  }

  onSubmit(){
    // console.log(this.filterRecord[0].firstName);
    const updateRecord = {
      uuid: this.getUUID,
      firstName:this.filterRecord[0].firstName,
      lastName:this.filterRecord[0].lastName,
      phoneNumber:this.filterRecord[0].phoneNumber,
      lastDonateDate:this.filterRecord[0].lastDonateDate,
      bloodGroup:this.filterRecord[0].bloodGroup,
    }
    
    const index = this.getStoreData.findIndex((record:any) => record.uuid === this.getUUID);
    
    if (index !== -1) {
      // Update the record in the array
      this.getStoreData[index] = { ...updateRecord };
      // this.sharedService.saveFormData(this.getStoreData[index]);
      localStorage.setItem('formSubmission', JSON.stringify(this.getStoreData));
      this.router.navigate(['/home'])

    }
    
  }

  


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../popup/popup.component';
import { SharedService } from '../service/shared.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  getStoreData:any = [];
  filteredRecords:any;
  tempStoreData:any = [];

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['firstName', 'lastName', 'bloodGroup', 'phoneNumber', 'lastDonateDate', 'action']; // Define your column names
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private modalService: NgbModal, private sharedService: SharedService, private router: Router){
    this.sharedService.getFormData().subscribe(formData => {
      this.getStoreData = formData;
      this.tempStoreData = formData;
      this.dataSource.data = this.getStoreData;
      
    });
  }

  openModal() {
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.title = 'Confirmation';
    modalRef.componentInstance.body = '';

    modalRef.componentInstance.confirmed.subscribe(() => {
      console.log('User confirmed');
        this.sharedService.getFormData().subscribe(formData => {
        this.getStoreData = formData;
        this.tempStoreData = formData;
        this.dataSource.data = this.getStoreData;
        
      });
      
    });
  }

  ngOnInit(): void {
    // Initialize your dataSource with your array of objects
    this.dataSource.data = this.getStoreData;
    this.dataSource.paginator = this.paginator;
  }

  readyTogive(){
    

    const today = new Date();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    this.filteredRecords = this.tempStoreData.filter((person:any) => {
      return new Date(person.lastDonateDate) <= ninetyDaysAgo;
    });
    
    this.dataSource.data = this.filteredRecords;
    
   
  }

  seeAllDonors(){
    this.dataSource.data = this.getStoreData;
  }

  editDonor(id:any){
    this.router.navigate(['/donor-details', id])
  }

  deleteRecord(uuid:any){
    this.dataSource.data = this.dataSource.data.filter((record:any) => record.uuid !== uuid);
    // console.log(this.dataSource.data);
    localStorage.setItem('formSubmission', JSON.stringify(this.dataSource.data));
  }

}

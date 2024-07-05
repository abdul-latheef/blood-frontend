import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class SharedService {
    
    constructor() {}
    
    saveFormData(data: any):  Observable<boolean> {
      if (typeof localStorage !== 'undefined') {
        const existingDataString = localStorage.getItem('formSubmission');
        const existingData = existingDataString ? JSON.parse(existingDataString) : [];
        existingData.push(data);
        localStorage.setItem('formSubmission', JSON.stringify(existingData));
        return of(true);
      } else {
        return of(false);
      }
    }
  
    getFormData(): Observable<any[]> {
      if (typeof localStorage !== 'undefined') {
        const formDataString = localStorage && localStorage.getItem('formSubmission');
        const formData = formDataString ? JSON.parse(formDataString) : [];
        return of(formData);
      } else {
        return of([]);
      }
    }

    registersaveFormData(data: any):  Observable<boolean> {
      if (typeof localStorage !== 'undefined') {
        const existingDataString = localStorage.getItem('registerData');
        const existingData = existingDataString ? JSON.parse(existingDataString) : [];
        existingData.push(data);
        localStorage.setItem('registerData', JSON.stringify(existingData));
        return of(true);
      } else {
        return of(false);
      }
    }
    
  }
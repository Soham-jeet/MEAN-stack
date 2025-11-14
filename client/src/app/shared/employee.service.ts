import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly baseURL = 'http://localhost:8080/api/employees/';
  list: Employee[] = [];

  employeeForm = this.fb.group({
    _id: [null as string | null],
    fullName: ['', Validators.required],
    position: ['', Validators.required],
    location: ['', Validators.required],
    salary: ['', Validators.required]
  })

  getEmployee() {
    this.http.get(this.baseURL)
      .pipe(catchError(this.errorhandler))
      .subscribe(
        data => {
        this.list = data as Employee[];
        console.log('Data is fetched from MongoDB');
        console.log(data);
    })
}

postEmployee(){
  return this.http.post(this.baseURL, this.employeeForm.value)
    .pipe(catchError(this.errorhandler));
}

putEmployee(){
  return this.http.put(this.baseURL+this.employeeForm.get('_id')?.value, this.employeeForm.value)
    .pipe(catchError(this.errorhandler));
}

deleteEmployee(_id: string){
  return this.http.delete(this.baseURL + _id)
    .pipe(catchError(this.errorhandler));
}

  private errorhandler(error : HttpErrorResponse){
  if (error.status === 0) {
    console.error('An error occurred:', error.error);
  } else {
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  return throwError(() => new Error('Something bad happened; please try again later.'));
}


  
}

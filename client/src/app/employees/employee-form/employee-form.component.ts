import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  submitted = false;

  constructor(public service: EmployeeService, private toastr: ToastrService) { }

  onSubmit() {
    this.submitted = true;
    if (this.service.employeeForm.valid) {
      console.log(this.service.employeeForm.value);
      //debugger; for debugging purpose
      if (this.service.employeeForm.get('_id')?.value == null) {
        this.service.postEmployee().subscribe(res => {
          //lets post the data
          console.log('got the response !')
          this.service.getEmployee();
          this.toastr.success('Employee added successfully', 'Employee Register');
          this.resetForm();
        })
      }
      else {
        //update the data
        this.service.putEmployee().subscribe(res => {
          this.toastr.info('Updated successfully', 'Employee Updated');
          this.resetForm();

          // ✅ Refresh the table
          this.service.getEmployee();
        })
      }

    }
  }

  resetForm() {
    this.service.employeeForm.reset({
      _id: null,
      fullName: '',
      position: '',
      location: '',
      salary: ''
    });
    this.submitted = false;
  }

}

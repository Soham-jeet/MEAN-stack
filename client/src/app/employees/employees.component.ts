import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  constructor(public employeeService: EmployeeService, private toastr: ToastrService) {}

  ngOnInit():void {
    this.employeeService.getEmployee();
  }

  populateForm(selectedRecord: Employee){
    this.employeeService.employeeForm.patchValue({
      _id: selectedRecord._id,
      fullName: selectedRecord.fullName,
      position: selectedRecord.position,
      location: selectedRecord.location,
      salary: selectedRecord.salary
    })
  }

  onDelete(_id: string | undefined){
    if (!_id) return; // ✅ prevent undefined from passing to delete method

    if(confirm('Are you sure to delete this record ?')){
      this.employeeService.deleteEmployee(_id).subscribe(res=>{
        this.employeeService.getEmployee();
        this.toastr.error('Deleted successfully', 'Employee Deleted');
      })
  }
}
}

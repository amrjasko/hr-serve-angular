import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Employee } from '../common/hrs-employee';
import { EmployeesService } from '../services/employees.service';
import { HrsEmployees } from './hrs-employees';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Department } from '../common/department';
declare var jQuery: any;

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  @ViewChild('myDetailPopup') myDetailPopup: ElementRef;
  @ViewChild('myEmpModal') myEmpModal: ElementRef;

  selectedRowId: number = 1;
  selectedDeparmentRow: number = 1;
  employees: Employee[];
  departments: Department[];
  alert: boolean = false;
  exForm: FormGroup;


  //current table row
  currentEmployee(employees) {
    this.selectedRowId = employees.employeeId;
  }

  currentDepartment(departments) {
    this.selectedDeparmentRow = departments.departmentId;
    console.log(`hi iasdff ` + departments.departmentId);
    this.listEmployees(departments.departmentId);
    this.selectedRowId = departments.departmentId;
  }

  constructor(private hrsEmployeeService: EmployeesService) { }

  ngOnInit(): void {
    // this.listEmployees();
    this.listDeprtments();
    this.listEmployees(this.selectedDeparmentRow);
  }

  saveNewDepartment(registerForm: NgForm) {
    this.hrsEmployeeService.addDepartment(registerForm.value).subscribe(
      res => {
        console.log(`Jasko asasdfg ` + res);
        this.listDeprtments();
      },
      err => console.log(err)
    );
  }

  saveNewEmployee(registerForm: NgForm) {
    console.log('hi here');
    console.log(registerForm.value);
    this.hrsEmployeeService.addEmployee(registerForm.value).subscribe(
      res => {
        console.log(`toooota ` + res);
        this.listEmployees(this.selectedDeparmentRow);
      },
      err => console.log(err)
    );
  }

  employeeToUpdate = {
    employeeId: 0,
    firstName: "",
    lastName: "",
    salary: 0,
    phoneNumber: "",
    managerId: "",
    departmentId: this.selectedDeparmentRow,
    hireDate: ""
  };

  departmentToUpdate = {
    departmentId: 0,
    departmentName: "",
    managerId: ""
  }

  listEmployees(id) {
    console.log('hi jasko');
    console.log(this.hrsEmployeeService.getEmployeesList())
    this.hrsEmployeeService.getEmployeeByDeptId(id).subscribe(
      (data: Employee[]) => {
        console.log('hi getEmployeeByDeptId ' + id);
        console.log(data);
        this.employees = data
      }
    )
  }

  listDeprtments() {
    this.hrsEmployeeService.getDepartments().subscribe(
      (data: Department[]) => {
        this.departments = data
      }
    )
  }

  addNewEmployee(selectedDeparment) {
    this.selectedDeparmentRow = selectedDeparment;
    jQuery(this.myEmpModal.nativeElement).modal('show');
    this.exForm = new FormGroup({
      'firstName' : new FormControl(null,Validators.required),
      'salary' : new FormControl(null,Validators.min(0)),
    });
  }

  addNewDepartment() {
    jQuery(this.myModal.nativeElement).modal('show');
  }


  deleteEmployee(employeeId: number) {
    this.hrsEmployeeService.deleteEmployee(employeeId).subscribe(
      res => {
        this.listEmployees(this.selectedDeparmentRow);
      },
      err => console.log(err)
    );
  }


  deleteDepartment(departmentId: number) {
    this.hrsEmployeeService.getEmployeesByDepartmentId(departmentId).subscribe(
      (data: Employee[]) => {
        if (data == null) {
          this.hrsEmployeeService.deleteDepartment(departmentId).subscribe(
            res => {
              console.log(`deleteDepartment ${departmentId} ` + res);
              this.listDeprtments();
              this.listEmployees(departmentId)
            },
            err => console.log(err)
          );
        } else {
          this.alert = true;
        }
      }
    )
  }

  edit(employee) {
    this.employeeToUpdate = employee;
    jQuery(this.myEmpModal.nativeElement).modal('show');
  }

  editDepartment(department) {
    this.departmentToUpdate = department;
    jQuery(this.myModal.nativeElement).modal('show');
  }

  updateEmployee(empPk: number) {
    if (empPk != null) {
      this.hrsEmployeeService.updateEmployee(this.employeeToUpdate).subscribe(
        res => {
          console.log(res);
          this.listEmployees(this.selectedDeparmentRow);
        },
        err => console.log(err)
      );
    }  
  }

  updateDepartment(departmentId: number) {
    if (departmentId != null) {
      this.hrsEmployeeService.updateDepartment(this.updateDepartment).subscribe(
        res => {
          console.log(res);
          this.listEmployees(this.selectedDeparmentRow);
        },
        err => console.log(err)
      );
    } else {

    }
  }

  close() {
    jQuery(this.myModal.nativeElement).modal('hide');
  }

  closeEmpPopup() {
    jQuery(this.myEmpModal.nativeElement).modal('hide');
  }

  closeAlert() {
    this.alert = false;
  }
}


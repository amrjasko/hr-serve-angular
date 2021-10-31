import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../common/hrs-employee';
import { map } from 'rxjs/operators';
import { Department } from '../common/department';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private baseUrl = 'http://localhost:5544/eteck/employee';
  private baseDepartmentUrl = 'http://localhost:5544/eteck/department';
  constructor(private httpClient: HttpClient) { }

  getEmployeesList(): Observable<Employee[]> {
    console.log(`${this.baseUrl}`);
    return this.httpClient.get<Employee[]>(`${this.baseUrl}`);
  }

  addDepartment(newDepartment)
  {
    return this.httpClient.post(`${this.baseDepartmentUrl}/add`,newDepartment);
  }

  addEmployee(neweEmployee)
  {
    console.log(neweEmployee);
    return this.httpClient.post(`${this.baseUrl}/add`,neweEmployee);
  }

 
  deleteDepartment(id) {
    return this.httpClient.delete(`${this.baseDepartmentUrl}/remove/` + id);
  }

  updateDepartment(id) {
    return this.httpClient.put(`${this.baseDepartmentUrl}/edit`, id);
  }

  getEmployeesByDepartmentId(id)
  {
    console.log(`${this.baseUrl}`);
    return this.httpClient.get<Employee[]>(`${this.baseUrl}/departmentId/`+id);
  }

  deleteEmployee(id) {
    return this.httpClient.delete(`${this.baseUrl}/remove/` + id);
  }

  updateEmployee(id)
  {
    return this.httpClient.put(`${this.baseUrl}/edit`, id);
  }

  getDepartments(): Observable<Department[]> {
    console.log(`${this.baseDepartmentUrl}`);
    return this.httpClient.get<Department[]>(`${this.baseDepartmentUrl}`);
  }

  getEmployeeByDeptId(id):Observable<Employee[]>
  {
    console.log(`${this.baseUrl}/departmentId/${id}`);
    return this.httpClient.get<Employee[]>(`${this.baseUrl}/departmentId/${id}`);
  }
}

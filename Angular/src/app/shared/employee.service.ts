import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee.model';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly baseURL = environment.rootURL + '/employees';
  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    return this.http.post<any[]>(this.baseURL, emp);
  }

  getEmployeeList() {
    return this.http.get<any[]>(this.baseURL);
  }

  putEmployee(emp: Employee) {

    // console.log("aici" + JSON.stringify(emp))
    return this.http.put<any[]>(this.baseURL + `/${emp.id}`, emp);
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.baseURL + `/${id}`);
  }

  refreshEmployeeList() {
    this.getEmployeeList().subscribe((res) => {
      this.employees = res as Employee[];
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.selectedEmployee = {
      id: "",
      firstname: "",
      surname: "",
      position: "",
      office: "",
      salary: null,
      project: "",
      projectName: "",
      poNumber: "",
      serialNo: "",
      skillCode: "",
    }
  }

  employee() {
    return this.http.get(this.baseURL, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}

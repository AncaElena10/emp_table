import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { NgForm } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import * as objectPath from 'object-path'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {

  sortedCollection: any[]
  order: string = 'name'
  reverse: boolean = false
  p
  public projects: any = []
  Arr = Array
  num: number = 1
  // cnt = 0
  displayProject: boolean = true

  constructor(
    public employeeService: EmployeeService, public apiService: ApiService) {

    this.employeeService.employee().subscribe((data) => {

      // console.log(data)

      for (var key in data) {
        if (data.hasOwnProperty(key)) {

          // console.log(typeof JSON.parse((data[key].project)))
          // console.log(data[key].project)

          let p = JSON.parse(data[key].project);
          let empId = data[key].id

          for (var i = 0; i < p.length; i++) {
            // console.log(p[i]);

            this.projects.push({
              id: empId,
              projectName: p[i].projectName,
              poNumber: p[i].poNumber,
              serialNo: p[i].serialNo,
              skillCode: p[i].skillCode,
            })
          }
        }
      }



      ////////////// this works if {} ////////////////
      // let empId = data[key].id
      // let p = JSON.parse(data[key].project);

      // this.projects.push({
      //   id: empId,
      //   projectName: p.projectName,
      //   poNumber: p.poNumber,
      //   serialNo: p.serialNo,
      //   skillCode: p.skillCode,
      // })
      ///////////////////////////////////////////////
    })
  }

  selectedEmployee = {
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
  };

  ngOnInit() {
    document.body.classList.remove('bg-img-login');
    document.body.classList.remove('bg-img-register');

    this.employeeService.resetForm();
    this.employeeService.refreshEmployeeList();
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
    this.selectedEmployee = emp;

    let cnt = 0

    for (var i = 0; i < this.projects.length; i++) {
      if (emp.id == this.projects[i].id) {
        cnt = cnt + 1
        console.log(this.projects[i].projectName)
      } else {
        continue
      }
    }

    if (cnt > 1) {
      console.log("aici")
      this.displayProject = true
    } else {
      console.log("sau aici")
      this.displayProject = false
    }
  }

  onDelete(id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.employeeService.deleteEmployee(id).subscribe((res) => {
        this.employeeService.refreshEmployeeList();
        this.employeeService.resetForm(form);
      });
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}

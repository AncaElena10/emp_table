import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal-add-employee',
  templateUrl: './modal-add-employee.component.html',
  styleUrls: ['./modal-add-employee.component.css']
})
export class ModalAddEmployeeComponent implements OnInit {

  public showProjectOptions: boolean = false;
  public x: any = []
  public skillCodeArray = [
    {
      'name':
        'Currency'
    },
    {
      'name':
        'R2017',
    },
    {
      'name':
        'R2018'
    },
    {
      'name':
        'R2019',
    }
  ]

  addUser: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    surname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    office: new FormControl(null, [Validators.required]),
    position: new FormControl(null, Validators.required),
    salary: new FormControl(null, Validators.required),
    project: new FormControl(null, Validators.required),
    projectName: new FormControl(null, Validators.required),
    poNumber: new FormControl(null),
    serialNo: new FormControl(null),
    skillCode: new FormControl(null)
  })

  userInfo: boolean = true;
  projectInfo: boolean = false;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.resetForm();
    this.employeeService.refreshEmployeeList();

  }

  onSubmit() {
    // console.log(this.addUser.value)

    // console.log(this.addUser.value.project)

    this.x.push({
      projectName: this.addUser.value.projectName,
      poNumber: this.addUser.value.poNumber,
      serialNo: this.addUser.value.serialNo,
      skillCode: this.addUser.value.skillCode
    })

    this.addUser.value.project = JSON.stringify(this.x)

    console.log(this.addUser.value.project)

    this.employeeService.resetForm();
    this.employeeService.postEmployee(this.addUser.value).subscribe((res) => {
      this.employeeService.refreshEmployeeList();
      this.employeeService.resetForm();
      window.location.reload();
    });
  }

  showUserInfo() {
    this.userInfo = true
    this.projectInfo = false
  }

  showProjectInfo() {
    this.projectInfo = true
    this.userInfo = false
  }
}

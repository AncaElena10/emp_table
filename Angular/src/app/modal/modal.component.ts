import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public x: any = []
  public p: any = []
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

  @Input("selectedObj") selectedObj;
  public projects: any = []
  public projectsById: any = []

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.resetForm();
    this.employeeService.refreshEmployeeList();

    this.employeeService.employee().subscribe((data) => {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {

          this.p = JSON.parse(data[key].project);
          let empId = data[key].id

          for (var i = 0; i < this.p.length; i++) {
            // console.log(p[i]);

            this.projects.push({
              id: empId,
              projectName: this.p[i].projectName,
              poNumber: this.p[i].poNumber,
              serialNo: this.p[i].serialNo,
              skillCode: this.p[i].skillCode,
            })
          }
        }
      }
    })
  }

  onSubmit(form: NgForm) {
    // console.log(projectName)
    // console.log(poNumber)
    // console.log(serialNo)
    // console.log(skillCode)

    // console.log(form.value)
    // console.log(this.projects)

    // console.log('aici1 ', this.x)

    // let x: any = []

    for (var i in this.projects) {
      if (this.projects[i].id == form.value.id) {
        // console.log("da")
        this.projectsById.push({
          projectName: this.projects[i].projectName,
          poNumber: this.projects[i].poNumber,
          serialNo: this.projects[i].serialNo,
          skillCode: this.projects[i].skillCode,
        })
      }
    }

    // console.log(this.projects)
    // console.log(this.projectsById)


    this.projectsById.push({
      projectName: form.value.projectName,
      poNumber: form.value.poNumber,
      serialNo: form.value.serialNo,
      skillCode: form.value.skillCode
    })
    // console.log(this.x)

    // console.log(this.projectsById)

    form.value.project = JSON.stringify(this.projectsById)

    // const newForm = <NgForm>{
    //   value: {
    //     id: form.value.id,
    //     firstname: form.value.firstname,
    //     surname: form.value.surname,
    //     position: form.value.position,
    //     office: form.value.office,
    //     salary: form.value.salary,
    //     project: form.value.project,
    //   }
    // };

    // console.log(newForm.value)


    this.employeeService.putEmployee(form.value).subscribe((res) => {
      this.employeeService.refreshEmployeeList();
      window.location.reload();
    });
  }
}
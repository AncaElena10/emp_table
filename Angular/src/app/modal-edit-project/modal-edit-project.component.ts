import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { ApiService } from '../shared/api.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-modal-edit-project',
  templateUrl: './modal-edit-project.component.html',
  styleUrls: ['./modal-edit-project.component.css']
})
export class ModalEditProjectComponent implements OnInit {

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

  showActiveProjects: boolean = true
  showAddNewProject: boolean = false

  @Input("selectedObj") selectedObj

  public projects: any = []
  public projectsById: any = []
  public x: any = []
  public p = []

  constructor(
    public employeeService: EmployeeService, public apiService: ApiService) {


    // this.employeeService.employee().subscribe((data) => {

    //   // console.log(data)

    //   for (var key in data) {
    //     if (data.hasOwnProperty(key)) {
    //       let empId = data[key].id
    //       let a = data[key].project.split('"', 16)
    //       this.projects.push({
    //         id: empId,
    //         projectName: a[3],
    //         poNumber: a[7],
    //         serialNo: a[11],
    //         skillCode: a[15]
    //       })
    //     }
    //   }
    // })

    // console.log((this.projects))

  }

  ngOnInit() {
    // console.log(this.x)
    this.employeeService.resetForm();
    this.employeeService.refreshEmployeeList();

    this.employeeService.employee().subscribe((data) => {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          this.p = JSON.parse(data[key].project);
          // console.log(this.p)
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
      // console.log(this.p)
    })


    // console.log(typeof (this.projects))
    // console.log(this.projects)
    // this.x = this.projects.slice()
    //   for (var i = 0; i < this.projects.length; i++) {
    //     this.x[i]  =this.projects[i]
    // }
    // console.log(this.x)
  }

  onSubmit(form: NgForm) {
    // console.log(this.p)

    // console.log(this.projects)

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


    // console.log(form.value.project)

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

  showProjects() {
    this.showActiveProjects = true
    this.showAddNewProject = false
  }

  addNewProject() {
    this.showAddNewProject = true
    this.showActiveProjects = false
  }

}

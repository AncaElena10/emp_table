import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-detailmodal',
  templateUrl: './detailmodal.component.html',
  styleUrls: ['./detailmodal.component.css']
})
export class DetailmodalComponent implements OnInit {

  @Input("selectedObj") selectedObj;

  selectedEmployee = {
    id: "",
    firstname: "",
    surname: "",
    position: "",
    office: "",
    salary: null,
    profectName: "",
  };

  constructor(public apiService: ApiService
  ) { }

  ngOnInit() {
  }
}
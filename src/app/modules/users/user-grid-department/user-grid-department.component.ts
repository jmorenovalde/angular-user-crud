import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-grid-department',
  templateUrl: './user-grid-department.component.html',
  styleUrls: ['./user-grid-department.component.scss'],
})
export class UserGridDepartmentComponent implements OnInit {
  public users = [1, 2, 3, 4, 5, 6];

  constructor() {}

  ngOnInit(): void {}
}

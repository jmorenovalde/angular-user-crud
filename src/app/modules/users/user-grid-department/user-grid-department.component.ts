import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-grid-department',
  templateUrl: './user-grid-department.component.html',
  styleUrls: ['./user-grid-department.component.scss'],
})
export class UserGridDepartmentComponent implements OnInit {
  /**
   * The department neme
   */
  @Input() department: string;

  @Input() users: User[];

  constructor() {}

  ngOnInit(): void {}
}

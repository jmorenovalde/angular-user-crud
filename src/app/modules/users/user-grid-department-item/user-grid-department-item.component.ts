import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-grid-department-item',
  templateUrl: './user-grid-department-item.component.html',
  styleUrls: ['./user-grid-department-item.component.scss'],
})
export class UserGridDepartmentItemComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  /**
   * @ignore
   * The init method of the component life cycle hook.
   */
  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  rows: User[] = [];

  /**
   * @ignore
   * The constructor of the component.
   */
  constructor() {}

  /**
   * @ignore
   * The init method of the component life cycle hook.
   */
  ngOnInit(): void {
    // TODO: this is only to design the view, this will come from UsersService.
    listUserDtoMock.forEach((userDto) => {
      const user = new User();
      user.loadFromUserDto(userDto);
      this.rows.push(user);
    });
    // console.log('Users', this.rows);
  }

  /**
   * This function is used to optimize the performance using ngFor.
   */
  public trackByFunction(index: number, item): number {
    if (!item) {
      return null;
    }
    return index;
  }

  public isEditing(userId: number, isEditing: boolean) {
    if (isEditing) {
      this.rows.map((user) => {
        if (user.id !== userId) {
          user.isEditing = false;
        } else {
          user.isEditing = true;
        }
        return user;
      });
    } else {
      this.rows.map((user) => {
        if (user.id === userId) {
          user.isEditing = false;
        }
        return user;
      });
    }
  }
}

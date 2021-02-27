import { Component, OnInit } from '@angular/core';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
})
export class UserGridComponent implements OnInit {
  public usersMarketing: User[] = [];
  public usersDevelopment: User[] = [];

  private users: User[] = [];

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
      this.users.push(user);
    });

    this.usersMarketing = this.users.filter((user) => user.department.toLowerCase() === 'marketing');
    this.usersDevelopment = this.users.filter((user) => user.department.toLowerCase() === 'development');
  }
}

import { Component, OnInit } from '@angular/core';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
})
export class UserGridComponent implements OnInit {
  /**
   * Users to show at the Marketing Departament Grid view.
   */
  public usersMarketing: User[] = [];
  /**
   * Users to show at the Development Departament Grid view.
   */
  public usersDevelopment: User[] = [];

  /**
   * The users list to show at both departments.
   */
  private users: User[] = [];

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
      this.users.push(user);
    });

    this.usersMarketing = this.users.filter((user) => user.department.toLowerCase() === 'marketing');
    this.usersDevelopment = this.users.filter((user) => user.department.toLowerCase() === 'development');
  }
}

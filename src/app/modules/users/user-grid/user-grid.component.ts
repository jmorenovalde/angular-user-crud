import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
})
export class UserGridComponent implements OnInit, OnDestroy {
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
   * This varible is used to unsuscribe the subscriptions on the ngOnDestroy method.
   */
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  /**
   * @ignore
   * The constructor of the component.
   */
  constructor(private usersService: UsersService) {
    this.usersService.users$?.pipe(takeUntil(this.unsubscribe$)).subscribe((users: User[]) => {
      this.users = users;
      this.usersMarketing = this.users.filter((user) => user.department.toLowerCase() === 'marketing');
      this.usersDevelopment = this.users.filter((user) => user.department.toLowerCase() === 'development');
    });
  }

  /**
   * @ignore
   * The init method of the component life cycle hook.
   */
  ngOnInit(): void {
    this.usersService.loadUsers();
  }

  /**
   * @ignore
   * Component lifecycle that runs when the component is going to destroy.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}

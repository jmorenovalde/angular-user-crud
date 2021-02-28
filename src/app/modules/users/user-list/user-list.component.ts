import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { UsersService } from '../users.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  /**
   * The users to show at the view.
   */
  public users: User[] = [];

  /**
   * This varible is used to unsuscribe the subscriptions on the ngOnDestroy method.
   */
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  /**
   * @ignore
   * The constructor of the component.
   */
  constructor(private usersService: UsersService) {
    this.usersService.users$?.pipe(takeUntil(this.unsubscribe$)).subscribe((users) => {
      this.users = users;
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
      this.users.map((user) => {
        if (user.id !== userId) {
          user.isEditing = false;
        } else {
          user.isEditing = true;
        }
        return user;
      });
    } else {
      this.users.map((user) => {
        if (user.id === userId) {
          user.isEditing = false;
        }
        return user;
      });
    }
  }
}

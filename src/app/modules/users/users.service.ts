import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserService } from '../../services/user.service';
import { UserDto } from '../../models/user-dto.model';
import { User } from '../../models/user.model';
import { ModalService } from '../modals/modal.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSource = new BehaviorSubject<User[]>([]);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public users$ = this.usersSource.asObservable();

  /**
   * List of users to check changes.
   */
  private users: User[];

  /**
   * @ignore
   * The constructor of the component.
   */
  constructor(private userService: UserService, private modalService: ModalService) {}

  public loadUsers(force = false): void {
    if (!force && this.users?.length > 0) {
      this.usersSource.next(this.users);
    } else {
      this.getUsers();
    }
  }

  /**
   * Create a user in the system.
   *
   * @param newUser the user to create in the systme.
   */
  public createUser(newUser: UserDto) {
    if (!newUser) {
      throw new Error('Required parameter `newUser` was null or undefined when calling `createUSer`.');
    }
    if (!newUser.created) {
      const today = new Date();
      newUser.created = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    }
    this.userService.createUser(newUser).subscribe((userDto) => {
      this.getUsers();
      this.modalService.close();
    });
  }

  /**
   * Delete a user form the system.
   *
   * @param id the ID of the user to delete
   */
  public deleteUser(id: number) {
    if (!id) {
      throw new Error('Required parameter `id` was null or undefined when calling `deleteUser`.');
    }
    this.userService.deleteUser(id).subscribe(() => {
      // delete the user while refresh the data.
      this.users = this.users.filter((user) => user.id !== id);
      this.getUsers();
      this.modalService.close();
    });
  }

  /**
   * Update a user in the system.
   *
   * @param editedUser the user to update
   */
  public updateUser(editedUser: UserDto) {
    if (!editedUser) {
      throw new Error('Required parameter `editedUser` was null or undefined when calling `updateUser`.');
    }
    this.userService.updateUser(editedUser).subscribe(() => {
      this.getUsers();
    });
  }

  private getUsers() {
    this.users = [];
    this.userService.findUsers().subscribe(
      (results: UserDto[]) => {
        results.forEach((userDto) => {
          const user = new User();
          if (userDto.created) {
            userDto.created = new Date(userDto.created);
          }
          user.loadFromUserDto(userDto);
          this.users.push(user);
        });
        this.usersSource.next(this.users);
      },
      (error) => console.error
    );
  }
}

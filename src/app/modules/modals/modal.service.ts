import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  /**
   * Type of the modal window.
   *
   *   Values:
   *    * `create` to show the create new user window.
   *    * `delete` to show the delete user window.
   */
  public type: 'create' | 'delete';

  /**
   * User to delete for the delete confirmation user modal window.
   */
  public user: User;

  /**
   * This variable is used to show or hide the modal window.
   */
  private pHideModal = true;

  public get hideModal() {
    return this.pHideModal;
  }

  /**
   * @ignore
   * The constructor of the component.
   */
  constructor() {}

  /**
   * This method is used to open a modal window.
   *
   * @param type type of the window.
   *   Values:
   *    * `create` to show the create new user window.
   *    * `delete` to show the delete user window.
   * @param user the user to delete. On create this param is not required.
   */
  public open(type: 'create' | 'delete', user: User = null): void {
    this.pHideModal = false;
    this.type = type;
    if (type === 'delete') {
      if (!user) {
        throw new Error('To delete is needed an `user`.');
      }
      this.user = user;
    } else {
      this.user = undefined;
    }
  }

  /**
   * This method is used to close the opened modal window.
   */
  public close(): void {
    this.pHideModal = true;
    this.type = undefined;
    this.user = undefined;
  }
}

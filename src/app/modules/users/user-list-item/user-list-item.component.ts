import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
})
export class UserListItemComponent implements OnInit {
  /**
   * The user to show in the item list
   */
  @Input() user: User;

  /**
   * this event is fired when change the mode of the list item editing.
   */
  @Output() isEditingMode = new EventEmitter<boolean>();

  /**
   * Form of the editing mode.
   */
  public editFom: FormGroup;

  constructor() {}

  /**
   * @ignore
   * The init method of the component life cycle hook.
   */
  ngOnInit(): void {
    this.initEditForm();
  }

  /**
   * toggle the view to the editing mode and fires isEditingMode event to the parent component as true.
   */
  public toggleToEdit(): void {
    if (this.user) {
      this.user.isEditing = true;
      this.isEditingMode.emit(true);
    }
  }

  /**
   * toggle the view to the normal mode and fires isEditingMode event to the parent component as false.
   */
  public cancelEdit(): void {
    // TODO: restore the value of the user data.
    if (this.user) {
      this.user.isEditing = false;
      this.isEditingMode.emit(false);
    }
  }

  /**
   * Save the modifed data and toggle the view to the normal mode and fires isEditingMode event to the parent component as false.
   */
  public save() {
    if (this.user) {
      // TODO: send data to the service.
      console.log('-->', this.editFom.value);
      this.user.isEditing = false;
      this.isEditingMode.emit(false);
    }
  }

  /**
   * Inti the data with
   */
  private initEditForm(): void {
    this.editFom = new FormGroup({
      userName: new FormControl(this.user?.name ? this.user.name : ''),
      userEmail: new FormControl(this.user?.email ? this.user.email : ''),
      userDepartment: new FormControl(this.user?.department ? this.user.department : ''),
    });
  }
}

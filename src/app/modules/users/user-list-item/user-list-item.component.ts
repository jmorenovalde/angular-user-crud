import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { UserDto } from '../../../models/user-dto.model';
import { EMAIL_PATTER } from '../../../utils/utills';
import { ModalService } from '../../modals/modal.service';
import { UsersService } from '../users.service';

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

  /**
   * This variable is used to show error message at the name validation.
   */
  public isNameInalid = false;

  /**
   * This variable is used to show error message at the email validation.
   */
  public isEmailInalid = false;

  /**
   * This property is used to disable the Save button.
   */
  public saveDisabled = false;

  /**
   * This property is used to disable the Save button.
   */
  public cancelDisabled = false;

  /**
   * This variable is used to restore the values of the user on change of mode or cancel canges.
   */
  private userRestore: UserDto;

  /**
   * This varible is used to unsuscribe the subscriptions on the ngOnDestroy method.
   */
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  /**
   * @ignore
   * The constructor of the component.
   */
  constructor(private modalService: ModalService, private usersService: UsersService) {}

  /**
   * @ignore
   * The init method of the component life cycle hook.
   */
  ngOnInit(): void {
    this.initEditForm();
    this.initUserRestore();
  }

  /**
   * toggle the view to the editing mode and fires isEditingMode event to the parent component as true.
   */
  public toggleToEdit(): void {
    if (this.user) {
      this.udapteFormValues();
      this.initUserRestore();
      this.user.isEditing = true;
      this.isEditingMode.emit(true);
    }
  }

  /**
   * toggle the view to the normal mode and fires isEditingMode event to the parent component as false.
   */
  public cancelEdit(): void {
    if (this.user) {
      this.user.isEditing = false;
      this.isEditingMode.emit(false);
    }
  }

  /**
   * Save the modifed data and toggle the view to the normal mode and fires isEditingMode event to the parent component as false.
   */
  public save(): void {
    if (this.user && this.editFom.valid) {
      this.saveDisabled = true;
      this.cancelDisabled = true;
      const userToUpdate: UserDto = {
        id: this.user.id,
        name: this.editFom.get('userName').value,
        email: this.editFom.get('userEmail').value,
        department: this.editFom.get('userDepartment').value,
        created: this.user.created,
      };
      this.usersService.updateUser(userToUpdate);
    }
  }

  public deleteUser(user: User): void {
    this.modalService.open('delete', user);
  }

  /**
   * Inti the data with
   */
  private initEditForm(): void {
    this.editFom = new FormGroup({
      userName: new FormControl(this.user?.name ? this.user.name : '', [Validators.required]),
      userEmail: new FormControl(this.user?.email ? this.user.email : '', [Validators.pattern(EMAIL_PATTER)]),
      userDepartment: new FormControl(this.user?.department ? this.user.department : ''),
    });
    this.editFom.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.checkForm();
    });
  }

  /**
   * This method validate if the form to enable or disable the save buttom.
   */
  private checkForm(): void {
    this.saveDisabled = this.editFom.invalid;
    this.checkName();
    this.checkEmail();
  }

  /**
   * Check if the name is valid to show the error on the form field.
   */
  private checkName(): void {
    if (this.editFom.invalid) {
      this.isNameInalid =
        this.editFom.get('userName').invalid &&
        (this.editFom.get('userName').dirty || this.editFom.get('userName').touched);
    } else {
      this.isNameInalid = false;
    }
  }

  /**
   * Check if the name is valid to show the error on the form field.
   */
  private checkEmail(): void {
    if (this.editFom.invalid) {
      this.isEmailInalid =
        this.editFom.get('userEmail').invalid &&
        (this.editFom.get('userEmail').dirty || this.editFom.get('userEmail').touched);
    } else {
      this.isEmailInalid = false;
    }
  }

  /**
   * This method initilize the value of the restore value.
   */
  private initUserRestore(): void {
    if (!this.userRestore) {
      this.userRestore = {};
    }
    if (this.user) {
      this.userRestore = {
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        department: this.user.department,
        created: this.user.created,
      };
    }
  }

  /**
   * This method update the values of the user.
   */
  private udapteFormValues(): void {
    if (this.user) {
      this.editFom.setValue({
        userName: this.user.name,
        userEmail: this.user.email,
        userDepartment: this.user.department,
      });
    }
  }
}

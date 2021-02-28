import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMAIL_PATTER } from '../../../../utils/utills';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['../modal.component.scss'],
})
export class CreateModalComponent implements OnInit, OnDestroy {
  /**
   * This property is used to disable the Save button.
   */
  public saveDisabled = true;

  /**
   * Form of the create a new user.
   */
  public userForm: FormGroup;

  /**
   * This variable is used to show error message at the name validation.
   */
  public isNameInalid = false;

  /**
   * This variable is used to show error message at the email validation.
   */
  public isEmailInalid = false;

  /**
   * This varible is used to unsuscribe the subscriptions on the ngOnDestroy method.
   */
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  /**
   * @ignore
   * The constructor of the component.
   */
  constructor(private modalService: ModalService) {}

  /**
   * @ignore
   * The init method of the component life cycle hook.
   */
  ngOnInit(): void {
    this.initUserForm();
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
   * This method close the modal window.
   */
  public close(): void {
    this.modalService.close();
  }

  /**
   * This method send the user information to the backend to create the new user.
   */
  public save(): void {
    this.saveDisabled = true;
    if (this.userForm.valid) {
      const userToCreate = {
        name: this.userForm.get('userName').value,
        email: this.userForm.get('userEmail').value,
        department: this.userForm.get('userDepartment').value,
        created: new Date(),
      };
      // TODO: send data to the service.
      setTimeout(() => {
        console.log('-->', userToCreate);
        this.modalService.close();
      }, 1500);
    }
  }

  /**
   * This method is used to check the name when lost the focus of the input field and not dirty or touched.
   */
  public onBlurUerName() {
    if (this.userForm.get('userName').invalid && !this.userForm.get('userName').value) {
      this.userForm.get('userName').markAsDirty();
      this.checkName();
    }
  }

  /**
   * This method initializes the form with its validations and initializes the data of the form.
   */
  private initUserForm(): void {
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      // if use Validated.patter enable emails as user@domain that are valid on servers
      userEmail: new FormControl('', [Validators.pattern(EMAIL_PATTER)]),
      userDepartment: new FormControl(-1),
    });

    this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.checkForm();
    });
  }

  /**
   * This method validate if the form to enable or disable the save buttom.
   */
  private checkForm() {
    this.saveDisabled = this.userForm.invalid;
    this.checkName();
    this.checkEmail();
  }

  /**
   * Check if the name is valid to show the error on the form field.
   */
  private checkName() {
    if (this.userForm.invalid) {
      this.isNameInalid =
        this.userForm.get('userName').invalid &&
        (this.userForm.get('userName').dirty || this.userForm.get('userName').touched);
    } else {
      this.isNameInalid = false;
    }
  }

  /**
   * Check if the name is valid to show the error on the form field.
   */
  private checkEmail() {
    if (this.userForm.invalid) {
      this.isEmailInalid =
        this.userForm.get('userEmail').invalid &&
        (this.userForm.get('userEmail').dirty || this.userForm.get('userEmail').touched);
    } else {
      this.isEmailInalid = false;
    }
  }
}

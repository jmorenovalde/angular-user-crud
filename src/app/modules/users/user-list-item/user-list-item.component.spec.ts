import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';
import { click } from 'src/app/utils/test-utils';
import { ModalService } from '../../modals/modal.service';
import { UsersService } from '../users.service';

import { UserListItemComponent } from './user-list-item.component';

describe('UserListItemComponent', () => {
  let component: UserListItemComponent;
  let fixture: ComponentFixture<UserListItemComponent>;
  let el: DebugElement;
  let modalService: any;
  let usersService: any;

  const modalServiceStub = jasmine.createSpyObj('ModalService', ['open']);
  const usersServiceStub = jasmine.createSpyObj('UsersService', ['updateUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListItemComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: UsersService, useValue: usersServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListItemComponent);
    modalService = TestBed.inject(ModalService);
    usersService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initEditForm', () => {
    it('load data from user empty', () => {
      const user = new User();
      component.user = user;
      component.ngOnInit();
      expect(component.editFom.get('userName').value).toBe('');
      expect(component.editFom.get('userEmail').value).toBe('');
      expect(component.editFom.get('userDepartment').value).toBe('');
    });

    it('load data from user full', () => {
      const user = new User();
      user.loadFromUserDto(listUserDtoMock[0]);
      component.user = user;
      component.ngOnInit();
      expect(component.editFom.get('userName').value).toBe('Justin');
      expect(component.editFom.get('userEmail').value).toBe('justin.fisher@mail.com');
      expect(component.editFom.get('userDepartment').value).toBe('Marketing');
    });
  });

  describe('toggleToEdit', () => {
    beforeEach(() => {
      spyOn(component.isEditingMode, 'emit');
    });

    it('should not be emited isEditingMode with `true` value and the user does not exist', () => {
      component.toggleToEdit();
      fixture.detectChanges();
      expect(component.isEditingMode.emit).not.toHaveBeenCalled();
    });

    it('should be emited isEditingMode with `true` value and the user exists', () => {
      const user = new User();
      user.loadFromUserDto({
        id: 1,
        name: 'Name',
        email: 'email@domain.com',
        department: 'Marketing',
        created: new Date(),
      });
      component.user = user;
      component.toggleToEdit();
      fixture.detectChanges();
      expect(component.isEditingMode.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('cancelEdit', () => {
    beforeEach(() => {
      spyOn(component.isEditingMode, 'emit');
    });

    it('should not be emited isEditingMode with `false` value and the user does not exist', () => {
      component.cancelEdit();
      fixture.detectChanges();
      expect(component.isEditingMode.emit).not.toHaveBeenCalled();
    });

    it('should be emited isEditingMode with `true` value and the user exists', () => {
      const user = new User();
      user.loadFromUserDto({
        id: 1,
        name: 'Name',
        email: 'email@domain.com',
        created: new Date(),
      });
      component.user = user;
      component.cancelEdit();
      fixture.detectChanges();
      expect(component.isEditingMode.emit).toHaveBeenCalledWith(false);
    });
  });

  describe('save', () => {
    beforeEach(() => {
      spyOn(component.isEditingMode, 'emit');
    });

    it('should not be emited isEditingMode with `false` value and the user does not exist', () => {
      component.save();
      fixture.detectChanges();
      expect(component.isEditingMode.emit).not.toHaveBeenCalled();
    });

    it('should be emited isEditingMode with `true` value and the user exists', () => {
      const user = new User();
      user.loadFromUserDto({
        id: 1,
        name: 'Name',
        email: 'email@domain.com',
        created: new Date(),
      });
      component.user = user;
      component.ngOnInit();
      fixture.detectChanges();
      component.save();
      expect(usersService.updateUser).toHaveBeenCalled();
    });
  });

  it('delete a user, open a modal window', () => {
    const user = new User();
    user.loadFromUserDto({
      id: 1,
      name: 'Name',
      email: 'email@domain.com',
      created: new Date(),
    });
    component.user = user;
    component.deleteUser(user);
    expect(modalService.open).toHaveBeenCalled();
  });

  describe('view', () => {
    beforeEach(() => {
      const user = new User();
      user.loadFromUserDto({
        id: 1,
        name: 'Name',
        email: 'email@domain.com',
        department: 'Marketing',
        created: new Date(),
      });
      component.user = user;
    });

    describe('not editing mode', () => {
      it('if user is not editing, the view will be the normal view', () => {
        fixture.detectChanges();
        const edit = el.query(By.css('.editing'));
        expect(edit).toBeNull('The view is editing');
        const name = el.query(By.css('.user__name > span'));
        expect(name.nativeElement.textContent).toEqual('Name', 'The name of the user is wrong');
        const email = el.query(By.css('.user__email > span'));
        expect(email.nativeElement.textContent).toEqual('email@domain.com', 'The email of the user is wrong');
        const department = el.query(By.css('.user__department > span'));
        expect(department.nativeElement.textContent).toEqual('Marketing', 'The deparment of the user is wrong');
        const buttons = el.queryAll(By.css('.btn-light'));
        expect(buttons.length).toBe(2);
      });

      it('click on delete button the delete moda should be opened', fakeAsync(() => {
        fixture.detectChanges();
        const buttons = el.queryAll(By.css('.btn-light'));
        const button = buttons[1];
        click(button);
        flush();
        expect(modalService.open).toHaveBeenCalled();
      }));

      it('click on edit button the view should be change to editng', fakeAsync(() => {
        fixture.detectChanges();
        const buttons = el.queryAll(By.css('.btn-light'));
        const button = buttons[0];
        click(button);
        flush();
        fixture.detectChanges();
        expect(component.user.isEditing).toBeTruthy();
        const edit = el.query(By.css('.editing'));
        expect(edit).toBeTruthy('The view didn`t change');
      }));
    });

    describe('Editing view', () => {
      it('check the view', () => {
        component.user.isEditing = true;
        fixture.detectChanges();
        const edit = el.query(By.css('.editing'));
        expect(edit).toBeTruthy('The view is normal view');
        const name = el.query(By.css('.user__name > input'));
        expect(name).toBeTruthy('The input of the name not exist');
        const email = el.query(By.css('.user__email > input'));
        expect(email).toBeTruthy('The input of the email not exist');
        const department = el.query(By.css('.user__department > select'));
        expect(department).toBeTruthy('The select of the deparment not exist');
        const buttons = el.queryAll(By.css('.btn-light'));
        expect(buttons.length).toBe(2);
      });

      it('click to cancel button an the view should be change to normal view', fakeAsync(() => {
        component.user.isEditing = true;
        fixture.detectChanges();
        const buttons = el.queryAll(By.css('.btn-light'));
        const button = buttons[1];
        click(button);
        flush();
        fixture.detectChanges();
        expect(component.user.isEditing).toBeFalsy();
        const edit = el.query(By.css('.editing'));
        expect(edit).toBeNull('The view didn`t change');
      }));

      it('click to update button and the view should be called updateUser', fakeAsync(() => {
        component.user.isEditing = true;
        fixture.detectChanges();
        component.editFom.setValue({
          userName: component.user.name,
          userEmail: component.user.email,
          userDepartment: component.user.department,
        });
        const edit = el.query(By.css('.editing'));
        expect(edit).toBeTruthy('The view is normal view');
        const buttons = el.queryAll(By.css('.btn-light'));
        const button = buttons[0];
        click(button);
        flush();
        expect(component.saveDisabled).toBeTruthy('Not enter at save method');
        expect(component.cancelDisabled).toBeTruthy();
        expect(usersService.updateUser).toHaveBeenCalled();
      }));
    });
  });
});

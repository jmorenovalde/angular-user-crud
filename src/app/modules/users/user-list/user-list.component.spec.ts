import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';

import { UserListItemComponent } from '../user-list-item/user-list-item.component';
import { UsersService } from '../users.service';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let el: DebugElement;
  let usersService: any;

  const usersServiceStub = jasmine.createSpyObj('UsersService', ['loadUsers']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent, UserListItemComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: UsersService, useValue: usersServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    usersService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isEditing', () => {
    beforeEach(() => {
      // Init the elements of the
      const usersMock: User[] = [];
      listUserDtoMock.forEach((userDto) => {
        const user = new User();
        user.loadFromUserDto(userDto);
        usersMock.push(user);
      });
      component.users = usersMock;
    });
    it('the rows are empty and `isEding` parameter is false', () => {
      component.users = [];
      component.isEditing(1, false);
      expect(component).toBeTruthy();
    });

    it('the rows are empty and `isEding` parameter is true', () => {
      component.users = [];
      component.isEditing(1, true);
      expect(component).toBeTruthy();
    });

    it('the user of the id parameter is in the rows and `isEding` parameter is true', () => {
      component.isEditing(1, true);
      const findUser = component.users.find((user) => user.id === 1);
      expect(findUser.isEditing).toBeTruthy();
    });

    it('the user of the id parameter is in the rows and `isEding` parameter is false', () => {
      component.isEditing(1, false);
      const findUser = component.users.find((user) => user.id === 1);
      expect(findUser.isEditing).toBeFalsy();
    });

    it('if other user is in the edit mode, change to not edit mode when call the method with other user', () => {
      component.isEditing(1, true);
      component.isEditing(2, true);
      const findUser = component.users.find((user) => user.id === 1);
      expect(findUser.isEditing).toBeFalsy();
    });
  });

  describe('trackByFunction', () => {
    it('item is null or undefined', () => {
      expect(component.trackByFunction(1, null)).toBeNull();
    });
    it('item is a valid object', () => {
      expect(component.trackByFunction(1, 2)).toEqual(1);
    });
  });

  describe('view', () => {
    it('the header is correct', () => {
      const name = el.query(By.css('.list--header__name > span'));
      expect(name.nativeElement.textContent).toEqual('Name', 'The column name not has the correct name');
      const email = el.query(By.css('.list--header__email > span'));
      expect(email.nativeElement.textContent).toEqual('Email', 'The column email not has the correct name');
      const department = el.query(By.css('.list--header__department > span'));
      expect(department.nativeElement.textContent).toEqual(
        'Department',
        'The column department not has the correct name'
      );
      const actions = el.query(By.css('.list--header__actions > span'));
      expect(actions.nativeElement.textContent).toEqual('Actions', 'The column actions not has the correct name');
    });

    it('the number of elements of users is correcte with enter data', () => {
      const users: User[] = [];
      listUserDtoMock.forEach((userDto) => {
        const user = new User();
        user.loadFromUserDto(userDto);
        users.push(user);
      });
      component.users = users;
      fixture.detectChanges();
      const elements = el.queryAll(By.css('.list--body'));
      expect(elements.length).toBe(listUserDtoMock.length);
    });
  });
});

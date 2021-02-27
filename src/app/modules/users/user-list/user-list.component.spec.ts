import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';

import { UserListItemComponent } from '../user-list-item/user-list-item.component';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent, UserListItemComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
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
      component.rows = usersMock;
    });
    it('the rows are empty and `isEding` parameter is false', () => {
      component.rows = [];
      component.isEditing(1, false);
      expect(component).toBeTruthy();
    });

    it('the rows are empty and `isEding` parameter is true', () => {
      component.rows = [];
      component.isEditing(1, true);
      expect(component).toBeTruthy();
    });

    it('the user of the id parameter is in the rows and `isEding` parameter is true', () => {
      component.isEditing(1, true);
      const findUser = component.rows.find((user) => user.id === 1);
      expect(findUser.isEditing).toBeTruthy();
    });

    it('the user of the id parameter is in the rows and `isEding` parameter is false', () => {
      component.isEditing(1, false);
      const findUser = component.rows.find((user) => user.id === 1);
      expect(findUser.isEditing).toBeFalsy();
    });

    it('if other user is in the edit mode, change to not edit mode when call the method with other user', () => {
      component.isEditing(1, true);
      component.isEditing(2, true);
      const findUser = component.rows.find((user) => user.id === 1);
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
});

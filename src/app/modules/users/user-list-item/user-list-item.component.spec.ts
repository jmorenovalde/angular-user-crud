import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';

import { UserListItemComponent } from './user-list-item.component';

describe('UserListItemComponent', () => {
  let component: UserListItemComponent;
  let fixture: ComponentFixture<UserListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListItemComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListItemComponent);
    component = fixture.componentInstance;
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
      component.save();
      fixture.detectChanges();
      expect(component.isEditingMode.emit).toHaveBeenCalledWith(false);
    });
  });
});

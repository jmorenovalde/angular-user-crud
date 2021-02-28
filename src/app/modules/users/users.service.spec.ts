import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from '../modals/modal.service';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userService: any;
  let modalService: any;

  const userServiceStub = jasmine.createSpyObj('UserService', ['findUsers', 'createUser', 'updateUser', 'deleteUser']);
  const modalServiceStub = jasmine.createSpyObj('ModalService', ['close']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: ModalService, useValue: modalServiceStub },
      ],
    });
    service = TestBed.inject(UsersService);
    userService = TestBed.inject(UserService);
    modalService = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('load the users, the `UserService` call `findUsers` method', () => {
    userService.findUsers.and.returnValue(of(listUserDtoMock));
    service.loadUsers();
    expect(userService.findUsers).toHaveBeenCalled();
  });

  describe('createUser', () => {
    it('call the method with a null user', () => {
      expect(() => service.createUser(null)).toThrow();
    });

    it('call the method with a user without created', () => {
      userService.createUser.and.returnValue(of(listUserDtoMock[0]));
      service.createUser({
        name: 'Name',
        email: 'test@test.net',
        department: 'Marketing',
      });
      expect(userService.createUser).toHaveBeenCalled();
    });

    it('call the method with a user with created', () => {
      userService.createUser.and.returnValue(of(listUserDtoMock[0]));
      service.createUser({
        name: 'Name',
        email: 'test@test.net',
        department: 'Marketing',
        created: new Date(),
      });
      expect(userService.createUser).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('call the method with a null id', () => {
      expect(() => service.deleteUser(null)).toThrow();
    });

    it('call the method with a valid id', () => {
      userService.deleteUser.and.returnValue(of({}));
      userService.findUsers.and.returnValue(of(listUserDtoMock));
      const usersMock: User[] = [];
      listUserDtoMock.forEach((userDto) => {
        const user = new User();
        user.loadFromUserDto(userDto);
        usersMock.push(user);
      });
      // eslint-disable-next-line @typescript-eslint/dot-notation
      service['users'] = usersMock;
      service.deleteUser(1);
    });
  });

  describe('updateUser', () => {
    it('call the method with a null editUser', () => {
      expect(() => service.updateUser(null)).toThrow();
    });

    it('call the method with a valid editUser', () => {
      userService.updateUser.and.returnValue(of(listUserDtoMock[0]));
      service.updateUser({
        name: 'Name',
        email: 'test@test.net',
        department: 'Marketing',
      });
      expect(userService.updateUser).toHaveBeenCalled();
    });
  });
});

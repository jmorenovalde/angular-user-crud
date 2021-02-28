import { TestBed } from '@angular/core/testing';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;
  const userMock = new User();
  const mockUserDto = listUserDtoMock[0];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
    userMock.loadFromUserDto(mockUserDto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('open', () => {
    it('call the mnethod to create a new user, check `type` and `hideModal` are the expected values', () => {
      service.open('create');
      expect(service.type).toBe('create');
      expect(service.hideModal).toBeFalsy();
    });

    it('call the mnethod to create a new user, the user at the service is undefined', () => {
      service.open('create', userMock);
      expect(service.user).toBeUndefined();
    });

    it('call the mnethod to delete a user without a user, the method throws an error', () => {
      expect(() => service.open('delete', null)).toThrow();
    });

    it('call the mnethod to delete a user, check `type`, `hideModala` and `user` are the expected values', () => {
      service.open('delete', userMock);
      expect(service.type).toBe('delete');
      expect(service.hideModal).toBeFalsy();
      expect(service.user).toEqual(userMock);
    });
  });

  it('close is call, hideModal is true and the orther are undefined.', () => {
    service.close();
    expect(service.hideModal).toBeTruthy();
    expect(service.type).toBeUndefined('type has value');
    expect(service.user).toBeUndefined('user has value');
  });
});

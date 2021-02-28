import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { listUserDtoMock } from '../mockdata/users.mock.spec';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findUsers', () => {
    it('call the method withhout any parameter', () => {
      service.findUsers().subscribe((response) => {
        expect(response).toBeTruthy('The service does not return a response.');
        expect(response).toEqual(listUserDtoMock);
      });
      const req = httpTestingController.expectOne('/USERS/users_jmv');
      expect(req.request.method).toEqual('GET');
      req.flush(listUserDtoMock);
    });

    it('call the method withh all parameters less `id`', () => {
      service.findUsers(0, 2, null, 'name', 'asc').subscribe((response) => {
        expect(response).toBeTruthy('The service does not return a response.');
        expect(response).toEqual(listUserDtoMock);
      });
      // eslint-disable-next-line arrow-body-style
      const req = httpTestingController.expectOne((httpRequest) => {
        return httpRequest.url === '/USERS/users_jmv';
      });
      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('_page').toString()).toBe('0', 'The parameter _page is nos valid.');
      expect(req.request.params.get('_limit').toString()).toBe('2', 'The parameter _limit is nos valid.');
      expect(req.request.params.get('_id')).toBeNull('The parameter _id appears and its value is null.');
      expect(req.request.params.get('_sort').toString()).toBe('name', 'The parameter _name is nos valid.');
      expect(req.request.params.get('_order').toString()).toBe('asc', 'The parameter _order is nos valid.');
      req.flush(listUserDtoMock);
    });

    it('call the method withh only `id`', () => {
      service.findUsers(null, null, 2).subscribe((response) => {
        expect(response).toBeTruthy('The service does not return a response.');
        expect(response).toEqual(listUserDtoMock);
      });
      // eslint-disable-next-line arrow-body-style
      const req = httpTestingController.expectOne((httpRequest) => {
        return httpRequest.url === '/USERS/users_jmv';
      });
      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('_page')).toBeNull('The parameter _page appears and its value is null');
      expect(req.request.params.get('_limit')).toBeNull('The parameter _limit appears and its value is null.');
      expect(req.request.params.get('_id').toString()).toBe('2', 'The parameter _id is nos valid.');
      expect(req.request.params.get('_sort')).toBeNull('The parameter _name appears and its value is null.');
      expect(req.request.params.get('_order')).toBeNull('The parameter _order appears and its value is null.');
      req.flush(listUserDtoMock);
    });

    it('the call return an server error', () => {
      service.findUsers().subscribe(
        (response) => fail('Internal server Error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        }
      );
      const req = httpTestingController.expectOne((httpRequest) => httpRequest.url === '/USERS/users_jmv');
      expect(req.request.method).toEqual('GET');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('createUser', () => {
    it('call the method with null userDto to create, return an error from the method', () => {
      expect(() => service.createUser(null)).toThrow();
    });

    it('call the method with userDto to create, return other userDto withh id', () => {
      const userDtoToCrete = { ...listUserDtoMock[0] };
      delete userDtoToCrete.id;
      service.createUser(userDtoToCrete).subscribe((response) => {
        expect(response).toBeTruthy('The service does not return a response.');
        expect(response).toEqual(listUserDtoMock[0]);
        expect(response.id).toBeTruthy();
      });
      const req = httpTestingController.expectOne('/USERS/users_jmv');
      expect(req.request.method).toEqual('POST');
      req.flush(listUserDtoMock[0]);
    });

    it('the call return an server error', () => {
      service.createUser(listUserDtoMock[0]).subscribe(
        (response) => fail('Internal server Error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        }
      );
      const req = httpTestingController.expectOne((httpRequest) => httpRequest.url === '/USERS/users_jmv');
      expect(req.request.method).toEqual('POST');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('updateUser', () => {
    it('call the method with null userDto to update, return an error from the method', () => {
      expect(() => service.updateUser(null)).toThrow();
    });

    it('call the medhto with userDto without `id` property', () => {
      const userDtoWithoutId = { ...listUserDtoMock[0] };
      delete userDtoWithoutId.id;
      expect(() => service.updateUser(userDtoWithoutId)).toThrow();
    });

    it('call the method with userDto to update, return other userDto withh id', () => {
      service.updateUser(listUserDtoMock[0]).subscribe((response) => {
        expect(response).toBeTruthy('The service does not return a response.');
        expect(response).toEqual(listUserDtoMock[0]);
      });
      const req = httpTestingController.expectOne('/USERS/users_jmv/1');
      expect(req.request.method).toEqual('PUT');
      req.flush(listUserDtoMock[0]);
    });

    it('the call return an server error', () => {
      service.updateUser(listUserDtoMock[0]).subscribe(
        (response) => fail('Internal server Error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        }
      );
      const req = httpTestingController.expectOne((httpRequest) => httpRequest.url === '/USERS/users_jmv/1');
      expect(req.request.method).toEqual('PUT');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('partialUpdateUser', () => {
    it('call the method with null id to update, return an error from the method', () => {
      expect(() => service.partialUpdateUser(1, null)).toThrow();
    });

    it('call the method with null userDto to update, return an error from the method', () => {
      expect(() => service.partialUpdateUser(null, listUserDtoMock[0])).toThrow();
    });

    it('call the method with userDto to update, return other userDto withh id', () => {
      service.partialUpdateUser(1, listUserDtoMock[0]).subscribe((response) => {
        expect(response).toBeTruthy('The service does not return a response.');
        expect(response).toEqual(listUserDtoMock[0]);
      });
      const req = httpTestingController.expectOne('/USERS/users_jmv/1');
      expect(req.request.method).toEqual('PATCH');
      req.flush(listUserDtoMock[0]);
    });

    it('the call return an server error', () => {
      service.partialUpdateUser(1, listUserDtoMock[0]).subscribe(
        (response) => fail('Internal server Error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        }
      );
      const req = httpTestingController.expectOne((httpRequest) => httpRequest.url === '/USERS/users_jmv/1');
      expect(req.request.method).toEqual('PATCH');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('deleteUser', () => {
    it('call the method with null id to update, return an error from the method', () => {
      expect(() => service.deleteUser(null)).toThrow();
    });

    it('call the method with the id of a equipment, return a empty objet', () => {
      service.deleteUser(1).subscribe((response) => {
        expect(response).toBeTruthy('The service does not return a response.');
        expect(response).toEqual({});
      });
      const req = httpTestingController.expectOne('/USERS/users_jmv/1');
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });

    it('the call return an server error', () => {
      service.deleteUser(1).subscribe(
        (response) => fail('Internal server Error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        }
      );
      const req = httpTestingController.expectOne((httpRequest) => httpRequest.url === '/USERS/users_jmv/1');
      expect(req.request.method).toEqual('DELETE');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

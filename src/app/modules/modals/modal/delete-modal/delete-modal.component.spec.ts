import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/modules/users/users.service';
import { ModalService } from '../../modal.service';

import { DeleteModalComponent } from './delete-modal.component';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let modalService: any;
  let usersService: any;

  const modalServiceStub = jasmine.createSpyObj('ModalService', ['close']);
  const usersServiceStub = jasmine.createSpyObj('UsersService', ['deleteUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: UsersService, useValue: usersServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalComponent);
    modalService = TestBed.inject(ModalService);
    usersService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    const userMock = new User();
    userMock.loadFromUserDto(listUserDtoMock[0]);
    component.user = userMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close the modal window', () => {
    component.close();
    expect(modalService.close).toHaveBeenCalled();
  });

  it('delete send the information to `UsersService` to delete and close the modal window.', () => {
    component.delete();
    expect(usersService.deleteUser).toHaveBeenCalled();
  });
});

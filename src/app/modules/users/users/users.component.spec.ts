import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '../../modals/modal.service';
import { UsersModule } from '../users.module';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let modalService: any;

  const modalServiceStub = jasmine.createSpyObj('ModalService', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersModule],
      providers: [{ provide: ModalService, useValue: modalServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    modalService = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleView', () => {
    it('if viewToShow is undefinde, will show the grid view', () => {
      component.toggleView(undefined);
      expect(component.showListOrGrid).toBeFalsy();
    });

    it('if viewToShow is `list`, will show the list view', () => {
      component.toggleView('list');
      expect(component.showListOrGrid).toBeTruthy();
    });

    it('if viewToShow is any value it will show the grid view', () => {
      component.toggleView('anyValue');
      expect(component.showListOrGrid).toBeFalsy();
    });
  });

  it('open the new user modal', () => {
    component.openAddUser();
    expect(modalService.open).toHaveBeenCalled();
  });
});

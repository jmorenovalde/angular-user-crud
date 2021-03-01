import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ModalService } from '../../modals/modal.service';
import { UsersService } from '../users.service';

import { UsersModule } from '../users.module';
import { UsersComponent } from './users.component';
import { DebugElement } from '@angular/core';
import { click } from 'src/app/utils/test-utils';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let el: DebugElement;
  let modalService: any;
  let usersService: any;

  const modalServiceStub = jasmine.createSpyObj('ModalService', ['open']);
  const usersServiceStub = jasmine.createSpyObj('UsersService', ['loadUsers']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersModule],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: UsersService, useValue: usersServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    modalService = TestBed.inject(ModalService);
    usersService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
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

  describe('view', () => {
    it('click the list button, the expected result shows the `UserListComponent`', () => {
      const listButton = el.query(By.css('.btn-rouced-left'));
      expect(listButton).toBeTruthy();
      click(listButton);
      fixture.detectChanges();
      expect(component.showListOrGrid).toBeTruthy();
      const list = el.query(By.css('.list-users'));
      expect(list).toBeTruthy();
    });

    it('click the grid button, the expected result shows the `UserGridComponent`', () => {
      const gridButton = el.query(By.css('.btn-rouced-right'));
      expect(gridButton).toBeTruthy();
      click(gridButton);
      fixture.detectChanges();
      expect(component.showListOrGrid).toBeFalsy();
      const grid = el.query(By.css('.grid-users'));
      expect(grid).toBeTruthy();
    });

    it('click the `Add row` button, the expected result shows the Add row modal', () => {
      const gridButton = el.query(By.css('.btn-rouced'));
      expect(gridButton).toBeTruthy();
      click(gridButton);
      fixture.detectChanges();
      expect(modalService.open).toHaveBeenCalled();
    });
  });
});

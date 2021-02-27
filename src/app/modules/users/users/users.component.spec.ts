import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGridComponent } from '../user-grid/user-grid.component';
import { UsersModule } from '../users.module';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
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
});

import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ModalsModule } from './modules/modals/modals.module';
import { UsersModule } from './modules/users/users.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [UsersModule, ModalsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

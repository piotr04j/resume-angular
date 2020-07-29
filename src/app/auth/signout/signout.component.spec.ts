import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutComponent } from './signout.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

describe('SignoutComponent', () => {
  let component: SignoutComponent;
  let fixture: ComponentFixture<SignoutComponent>;
  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  const authService = {
    signOut: jasmine.createSpy()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoutComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: authService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should logout and redirect to home page', () => {
    expect (mockRouter.navigateByUrl).toHaveBeenCalledWith ('/');
  });
});

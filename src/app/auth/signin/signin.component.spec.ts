import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService, SinginResponse, } from '../auth.service';
import { User } from '../../../models/User';
import { Observable, of, throwError } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({ selector: 'app-input', template: '' })
class InputComponent {
  @Input() control: FormControl;
}
const email = 'test@gmail.com';
const res: SinginResponse =  {
  idToken: '123456',
  email,
  expiresIn: '3600',
  localId:  '1231',
  registered: true,
  refreshToken: '12345qwe'
};

const authServiceStub = {
  signIn(user: User): Observable<SinginResponse> {
    return of(res);
  }
};

const router = {
  navigateByUrl: () => { }
};

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninComponent, InputComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [{ provide: AuthService, useValue: authServiceStub }, { provide: Router, useValue: router }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render form', () => {
    const signIn = spyOn(authServiceStub, 'signIn').and.returnValue(of(res));
    component.signinForm.controls.email.setValue(email);
    component.signinForm.controls.password.setValue('asb123@#');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(signIn).toHaveBeenCalledTimes(1);
    expect(signIn).toHaveBeenCalledWith({ email, password: 'asb123@#' });
  });

  it('should render wrong credential unknown message', () => {
    authServiceStub.signIn = () => {
      return throwError({
        error: {
          error: {
            message: 'INVALID_PASSWORD'
          }
        }
      });
    };
    component.signinForm.controls.email.setValue(email);
    component.signinForm.controls.password.setValue('asb123@@');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Email or password is incorrect!');
  });

  it('should render error unknown message', () => {
    authServiceStub.signIn = () => {
      return throwError({
        error: {
          error: {
            message: 'some error'
          }
        }
      });
    };
    component.signinForm.controls.email.setValue(email);
    component.signinForm.controls.password.setValue('asb123@@');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').textContent)
        .toContain('We have some problems! Please try again or contact with administrator!');
  });
});

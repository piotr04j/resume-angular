import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import {AuthService, singupResponse} from "../auth.service";
import {Component, Input} from "@angular/core";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Observable, of, throwError} from "rxjs";
import {User} from "../../../models/User";
import {Router} from "@angular/router";

@Component({selector: 'app-input', template: ''})
class InputComponent {
  @Input() control: FormControl
}

const email = 'test@gmail.com';
const res: singupResponse =  {
  "idToken": '123456',
  email,
  "refreshToken": '654321',
  "expiresIn": '3600',
};
const authServiceStub = {
  signUp(user: User): Observable<singupResponse> {
    return of(res)
  }
};

const router = {
  navigateByUrl: () => {}
};

describe('SignupComponent tests', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent, InputComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [{ provide: AuthService, useValue: authServiceStub }, {provide: Router, useValue: router}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render form', () => {
    const signUp = spyOn(authServiceStub, 'signUp').and.returnValue(of(res));
    component.signupForm.controls['email'].setValue(email);
    component.signupForm.controls['password'].setValue( 'asb123@@');
    component.signupForm.controls['passwordConfirmation'].setValue( 'asb123@@');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click()
    expect(signUp).toHaveBeenCalledTimes(1);
    expect(signUp).toHaveBeenCalledWith({email, password: 'asb123@@'});
  });

  it('should render error message', () => {
    authServiceStub.signUp = () => {
      return throwError({
        error: {
          message: 'EMAIL_EXISTS'
        }
      })
    }

    component.signupForm.controls['email'].setValue(email);
    component.signupForm.controls['password'].setValue( 'asb123@@');
    component.signupForm.controls['passwordConfirmation'].setValue( 'asb123@@');
    component.signupForm.markAsDirty();
    component.signupForm.markAllAsTouched();
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click()
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('This email already exists!');
  });
});

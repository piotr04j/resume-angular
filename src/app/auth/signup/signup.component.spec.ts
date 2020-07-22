import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import {AuthService, singupResponse} from "../auth.service";
import {Component, Input} from "@angular/core";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Observable, of} from "rxjs";
import {User} from "../../../models/User";

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

describe('SignupComponent tests', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent, InputComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [{ provide: AuthService, useValue: authServiceStub }]
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
});

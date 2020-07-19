import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {AuthService, singinResponse, } from "../auth.service";
import {User} from "../../../models/User";
import {Observable, of} from "rxjs";
import {Component, Input} from "@angular/core";

@Component({selector: 'app-input', template: ''})
class InputComponent {
  @Input() inputFormControlName: FormControl
}
const email = 'test@gmail.com';
const res: singinResponse =  {
  "idToken": '123456',
  email,
  "refreshToken": '654321',
  "expiresIn": '3600',
  localId:  '1231',
  registered: true
};
const authServiceStub = {
  signIn(user: User): Observable<singinResponse> {
    return of(res)
  }
};

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninComponent, InputComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [{ provide: AuthService, useValue: authServiceStub }]
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
    component.signinForm.controls['email'].setValue(email);
    component.signinForm.controls['password'].setValue( 'asb123');
    const button = fixture.nativeElement.querySelector('button');
    button.click()
    expect(signIn).toHaveBeenCalledTimes(1);
    expect(signIn).toHaveBeenCalledWith({email, password: 'asb123'});
  });
});

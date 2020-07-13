import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {AuthService} from "../auth.service";
import {Component} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

@Component({selector: 'app-input', template: ''})
class InputComponent {}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockAuthService = { signUp: () =>{}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent, InputComponent ],
      imports: [ ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render form', () => {
    component.signupForm.controls['email'].setValue( 'test@wp.pl')
    component.signupForm.controls['password'].setValue( 'asb123')
    const button = fixture.nativeElement.querySelector('button');
    button.click()
    expect(component.signupForm.value).toBe('sss')
  });
});

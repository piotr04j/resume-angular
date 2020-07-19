import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

describe('InputComponent', () => {
  let inputComponent: InputComponent;
  let inputComponentFixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
    inputComponentFixture= TestBed.createComponent(InputComponent);
    inputComponent = inputComponentFixture.componentInstance;
    inputComponent.control = new FormControl('')
    inputComponent.inputType = 'email';
    inputComponent.label = 'Username';
    inputComponentFixture.detectChanges();

  }));

  it('should render', () => {
    const compiledComponent = inputComponentFixture.nativeElement;
    expect(compiledComponent.querySelector('label').textContent).toContain('Username');
    expect(compiledComponent.querySelector('input').type).toBe('email');
    expect(compiledComponent.querySelector('input').value).toBe('');
  })


});

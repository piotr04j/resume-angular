import {async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
const using = require('jasmine-data-provider')

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
    inputComponent = inputComponentFixture.componentInstance
  }));

  it('should render', () => {
    inputComponent.control = new FormControl('');
    inputComponent.inputType = 'email';
    inputComponent.label = 'Username';
    inputComponentFixture.detectChanges();
    const compiledComponent = inputComponentFixture.nativeElement;
    expect(compiledComponent.querySelector('label').textContent).toContain('Username');
    expect(compiledComponent.querySelector('input').type).toBe('email');
    expect(compiledComponent.querySelector('input').value).toBe('');
  })

    const errorProvider = () => {
        return [
            {
                error: 'email',
                expectedMessage: 'Enter a valid email!'
            },
            {
                error: 'required',
                expectedMessage: 'This field is required!'
            },
            {
                error: 'pattern',
                expectedMessage: 'Invalid format! Password has to contain digits, letters and special characters!'
            },
            {
                error: 'minlength',
                expectedMessage: 'Value you entered is  characters long, but it must be at aleast  characters'
            }
        ];
    }

    using(errorProvider, (errorsData) => {
      it('should display error message ',  () => {
          const formControl = new FormControl('', {
              validators: () => {
                  return { [errorsData.error] : true}
              }
          });
          formControl.markAsTouched();
          formControl.markAsDirty();
          inputComponent.control = formControl;
          inputComponent.inputType = 'email';
          inputComponent.label = 'Username';
          inputComponentFixture.detectChanges();
          const compiled = inputComponentFixture.debugElement;
          expect(compiled.nativeElement.querySelector('p').textContent).toContain(errorsData.expectedMessage);
      })
  })
});

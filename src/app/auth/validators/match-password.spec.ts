import { MatchPassword } from './match-password';
import {FormControl, FormGroup} from "@angular/forms";

describe('MatchPassword', () => {
  let form: FormGroup;
  beforeAll(() => {
    form = new FormGroup({
      password: new FormControl(),
      passwordConfirmation: new FormControl()
    })
  })

  it('should create an instance', () => {
    expect(new MatchPassword()).toBeTruthy();
  });

  it('should return null', () => {
    form.controls['password'].setValue('123qwe');
    form.controls['passwordConfirmation'].setValue('123qwe');
    const validator = new MatchPassword();

    expect(validator.validate(form)).toBeNull();
  });

  it('should return error', () => {
    form.controls['password'].setValue('qwe123');
    form.controls['passwordConfirmation'].setValue('123qwe');
    const validator = new MatchPassword();

    expect(JSON.stringify(validator.validate(form))).toBe(JSON.stringify({passwordsDontMatch: true}));
  });
});

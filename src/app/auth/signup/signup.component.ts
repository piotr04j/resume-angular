import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    ])
  }, {
        validators: [this.matchPassword.validate]
    }
);

  constructor(private authService: AuthService, private matchPassword: MatchPassword, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const { email, password } = this.signupForm.value;
    this.authService.signUp({ email, password }).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      complete: () => {
      },
      error: ({ error }) => {
        if (error.error.message === 'EMAIL_EXISTS') {
          this.signupForm.setErrors({ userExist: true });
        } else {
          this.signupForm.setErrors({ unknownError: true });
        }
      }
    });
  }
}

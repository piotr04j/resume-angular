import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  signinForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    ])
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signinForm.invalid) {
      return;
    }

    const { email, password } = this.signinForm.value;
    this.authService.signIn({ email, password }).subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        (err) => {
          console.log(err)
          if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            this.signinForm.setErrors({ invalidCredential : true });
          } else {
            this.signinForm.setErrors({ unknownError: true });
          }
        }
    )
  }
}

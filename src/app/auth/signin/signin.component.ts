import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  signinForm = new FormGroup({
    email: new FormControl('', []),
    password: new FormControl('', [])
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const { email, password } = this.signinForm.value;
    this.authService.signIn({email, password}).subscribe((res) => {
      console.log(res)
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.signupForm)
  }
}

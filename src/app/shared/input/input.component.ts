import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {
  @Input() inputType: string;
  @Input() control: FormControl;
  @Input() label: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  showErrors() {
    const {dirty, touched, errors } = this.control;

    return dirty && touched && errors;
  }
}

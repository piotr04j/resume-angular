import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {
  @Input() inputType: string;
  @Input() inputFormControlName: FormControl;
  @Input() label: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}
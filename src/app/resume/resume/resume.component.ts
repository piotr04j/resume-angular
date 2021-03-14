import { Component, OnInit } from '@angular/core';
import {Validators, FormArray, FormControl, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Resume } from '../../../models/Resume';
import {AuthService} from "../../auth/auth.service";
import {FormControlGroup, FormGroupService} from "../value-objects/factories/form-group.service";
import {FirebaseService} from "../../shared/firbase-service/firebase.service";
import {DatabaseService} from "../../db/database.service";

interface ResumeWrapper {
  [key: string]: Resume
}

export type formField =  'education' | 'experience' | 'skills' | 'additionalInformation';
export type formArrName = 'educationFormArr' | 'experienceFormArr' | 'skillsFormArr' | 'additionalInformationFormArr';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.sass']
})
export class ResumeComponent implements OnInit {
  educationFormArr = new FormArray([]);
  experienceFormArr = new FormArray([]);
  skillsFormArr = new FormArray([]);
  additionalInformationFormArr = new FormArray([]);

  resumeForm = new FormGroup({
    name: new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3)
        ]),
    birthDay: new FormControl(
        '',
        Validators.required
    ),
    phoneNumber: new FormControl(
        '',
        Validators.required
    ),
    photo: new FormControl(
        ''
    ),
    email: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/\S+@\S+\.\S+/i)
    ]),
    description: new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(3)
        ]),
    linkedUrl: new FormControl(
        '',
        [
          Validators.maxLength(50),
          Validators.minLength(7)
        ]),
    portfolioUrl:  new FormControl(
        '',
        [
          Validators.maxLength(50),
          Validators.minLength(7)
        ]),
    education:  this.educationFormArr,
    experience: this.experienceFormArr,
    skills: this.skillsFormArr,
    additionalInformation: this.additionalInformationFormArr,
    lawDisclaimer: new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(3)
        ])
  });

  constructor(
      private authService: AuthService,
      private formGroupFactory: FormGroupService,
      private firebase: FirebaseService,
      private databaseService: DatabaseService,
      private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.databaseService.getUserResumeFromDatabase().then( data => {
      if(data.val()) {
        const savedResume = data.val()
        this.ensureDataForFormArr(
          savedResume,
          'education',
          'educationFormArr',
          this.formGroupFactory.createFormControlGroup('education')
        );
        this.ensureDataForFormArr(
          savedResume,
          'experience',
          'experienceFormArr',
          this.formGroupFactory.createFormControlGroup('experience')
        );
        this.ensureDataForFormArr(
            savedResume,
            'skills',
            'skillsFormArr',
            this.formGroupFactory.createFormControlGroup('skills')
        );
        this.ensureDataForFormArr(
            savedResume,
            'additionalInformation',
            'additionalInformationFormArr',
            this.formGroupFactory.createFormControlGroup('additionalInformation')
        );
        this.resumeForm.patchValue(savedResume);
      } else {
        this.addGroupInputs('skillsFormArr', 'skills');
        this.addGroupInputs('educationFormArr', 'education');
        this.addGroupInputs('experienceFormArr', 'experience');
        this.addGroupInputs('additionalInformationFormArr', 'additionalInformation');
      }
    })

    this.databaseService.getPhoto().then( url => {
      if(url) {
        this.httpClient.get(url, {
          headers: {
            // obejscie corsow https://cloud.google.com/storage/docs/gsutil_install#deb
            'Access-Control-Allow-Origin': '*'
          }
        }).subscribe((photo) => {
          console.log(photo)
        })
      }
    })
  }

  // TODO implement handle of reauthentication
  onSubmit() {
    if(!this.authService.checkAuthState()) {
      // this.authService.refreshToken()
    } else {
      this.saveResume()
    }
  }

  private saveResume() {
    const userId = this.firebase.app.auth().currentUser.uid
    this.removeEmptyFormGroupFromFormArray('skillsFormArr');
    this.removeEmptyFormGroupFromFormArray('experienceFormArr');
    this.removeEmptyFormGroupFromFormArray('educationFormArr');
    this.databaseService.saveUserResume(this.resumeForm, userId)
  }

  addGroupInputs(
    formArrName: formArrName,
    controls: formField
  ) {
    this[formArrName].push(
        new FormGroup(
            { ...this.formGroupFactory.createFormControlGroup(controls)}
        )
    );
  }

  removeGroupInputs(
      formArrName: formArrName,
      index: number
  ) {
    if(this[formArrName].length > 1) {
      this[formArrName].removeAt(index);
    } else {
      this[formArrName].at(0).reset();
    }
  }

  getControls(controlName: formField)  {
    return (this.resumeForm.get(controlName) as FormArray).controls;
  }

  private ensureDataForFormArr(
    resume: Resume,
    resumeField: formField,
    formArrName: formArrName,
    formControls: FormControlGroup
  ) {
    resume[resumeField].map( (data) => {
      const controls = Object.keys(formControls).reduce((accumulator: any , currentValue: string) => {
        accumulator[currentValue] = formControls[currentValue];
        accumulator[currentValue].setValue(data[currentValue]);

        return accumulator;
      }, {})
      this[formArrName].push(
        new FormGroup({
          ...controls
        })
      )
    });
  }

  private removeEmptyFormGroupFromFormArray(formArrName: formArrName) {
    let length = this[formArrName].length;
    let emptyFormGroup = false;
    while (length > 1 && !emptyFormGroup) {
      const formGroup: FormGroup = this[formArrName].at(length - 1) as FormGroup;
      emptyFormGroup = Object.values(formGroup.controls).some((formControl: FormControl) => {
        return formControl.value !== '';
      })
      if(!emptyFormGroup) {
        this[formArrName].removeAt(length - 1)
      }
      length--;
    }
  }

  async onPhotoChanged($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0]
    const response = await this.databaseService.uploadPhoto(file)
    switch (response) {
      case "fail":
        this.resumeForm.setErrors({ photoFail : true });
        break;
      case "size":
        this.resumeForm.setErrors({ photoSize : true });
        break;
      case "format":
        this.resumeForm.setErrors({ photoFormat : true });
        break;
      default: return;
    }
  }
}


// doimplementowac obsluge bledow formularza

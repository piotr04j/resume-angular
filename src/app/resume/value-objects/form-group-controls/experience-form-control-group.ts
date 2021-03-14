import {FormControl, Validators} from "@angular/forms";
import {FormControlGroup} from "../factories/form-group.service";

interface FormExperienceControlGroup extends FormControlGroup {
    name: FormControl
    date: FormControl
    description: FormControl
}

export class ExperienceFormControlGroup implements FormExperienceControlGroup{
    name: FormControl
    date: FormControl
    description: FormControl

    constructor() {
        this.name =  new FormControl(
            '',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(150)
            ])
        this.date = new FormControl(
            '',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(12)
            ])
        this.description = new FormControl(
            '',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(250)
            ])
    }
}

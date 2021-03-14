import {FormControl, Validators} from "@angular/forms";
import {FormControlGroup} from "../factories/form-group.service";

interface AdditionalInformationControlGroup extends FormControlGroup {
    name: FormControl
    description: FormControl
}

export class AdditionalInformationFormControlGroup implements AdditionalInformationControlGroup {
    name: FormControl;
    description: FormControl;

    constructor() {
        this.name = new FormControl(
            '',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
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

import {FormControl, Validators} from "@angular/forms";
import {FormControlGroup} from "../factories/form-group.service";

interface FormSkillControlGroup extends FormControlGroup {
    skill: FormControl
    level: FormControl
}

export class SkillsFormControlGroup implements FormSkillControlGroup {
    skill: FormControl;
    level: FormControl;

    constructor() {
        this.skill = new FormControl(
            '',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ])
        this.level = new FormControl(
            '',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ])
    }
}

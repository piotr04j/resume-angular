import {Injectable} from "@angular/core";
import {SkillsFormControlGroup} from "../form-group-controls/skills-form-control-group";
import {ExperienceFormControlGroup} from "../form-group-controls/experience-form-control-group";
import {EducationFormControlGroup} from "../form-group-controls/education-form-control-group";
import {AdditionalInformationFormControlGroup} from "../form-group-controls/additional-information-form-control-group";

export interface FormControlGroup {}
type formGroupName = 'education' | 'experience' | 'skills' | 'additionalInformation'

@Injectable({
    providedIn: 'root'
})
export class FormGroupService {

    createFormControlGroup(formGroupName: formGroupName): FormControlGroup {
        switch (formGroupName) {
            case "skills":
                return new SkillsFormControlGroup()
            case "experience":
                return new ExperienceFormControlGroup()
            case "education":
                return new EducationFormControlGroup()
            case "additionalInformation":
                return new AdditionalInformationFormControlGroup()
        }
    }
}

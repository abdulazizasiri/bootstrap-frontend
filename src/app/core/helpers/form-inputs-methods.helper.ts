import { FormGroup } from "@angular/forms";

export function disableInputs(inputs: string[], form: FormGroup) {
  inputs.forEach((f) => {
    form.controls[f].disable();
  });
}

export function scrollToFirstInvalidControl(formId = 'formRefId') {
  let form = document.getElementById(formId); // <-- your formID
  let firstInvalidControl = form?.querySelector('.p-element.ng-invalid');

  if(firstInvalidControl) {
     firstInvalidControl.scrollIntoView({ block: 'center', behavior: 'smooth' });
     (firstInvalidControl as HTMLElement).focus();
  }  
}

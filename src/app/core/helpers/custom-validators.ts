import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';


export function strongPassword(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const regexString = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
    return !regexString.test(control.value) ? { 'InvalidPasswordPattern': { value: control.value } } : null;
  };
}


export function CustomEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(control.value);
      return !reg ? { 'InvalidEmail': { value: control.value } } : null;
    } else {
      return null
    }
  };
}

export function noSpecialCharsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const allowedCharacter = /^[\u0621-\u064A0-9a-zA-Z ]+$/g.test(control.value);
    const allowedWhiteSpace = /^(?!\s*$)\s*\S.*$/g.test(control.value);
    return (!allowedCharacter && { 'noSpecialChars': { value: control.value } }) || (!allowedWhiteSpace && { 'required': { value: control.value } }) || null
  };
}

export function noSpecialCharsAndSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const allowedCharacter = /^[\u0621-\u064A0-9a-zA-Z]+$/g.test(control.value);
    const allowedWhiteSpace = /^(?!\s*$)\s*\S.*$/g.test(control.value);
    return (!allowedCharacter && { 'noSpecialCharsAndSpaces': { value: control.value } }) || (!allowedWhiteSpace && { 'required': { value: control.value } }) || null
  };
}


export function ArabicCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      const reg = /^[\u0600-\u06FF\s]+$/.test(control.value);
      return !reg ? { 'arabicCharacters': { value: control.value } } : null;
    } else {
      return null
    }
  };
}

export function EnglishCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      const reg = /^[a-zA-Z0-9 ]+$/.test(control.value);
      return !reg ? { 'englishCharacters': { value: control.value } } : null;
    } else {
      return null
    }
  };
}

export function CharactersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      const reg = /^[a-zA-Z ]+$/.test(control.value);
      return !reg ? { 'CharactersOnly': { value: control.value } } : null;
    } else {
      return null
    }
  };
}

export function NumbersCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      const reg = /^[0-9]+$/.test(control.value);
      return !reg ? { 'numbersCharacters': { value: control.value } } : null;
    } else {
      return null
    }
  };
}

export function minSelectedCheckboxes(min = 1): ValidatorFn {
  return (control: AbstractControl) => {
    const formArray = control as FormArray;
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((acc, selected) => (selected ? acc + 1 : acc), 0);
    return totalSelected >= min ? null : { 'required': true };
  };
}

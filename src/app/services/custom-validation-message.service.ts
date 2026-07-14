import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { formatString } from 'typescript-string-operations';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationMessageService {

  constructor(private _translateService: TranslateService) {
  }


  validationErrorMessages = {
    required: (field) => formatString(this._translateService.instant('RequiredField'), this._translateService.instant(field)),
    email: (field) => formatString(this._translateService.instant('EmailField'), this._translateService.instant(field)),
    min: (field, value) => formatString(this._translateService.instant('MinValueField'), this._translateService.instant(field), value),
    max: (field, value) => formatString(this._translateService.instant('MaxValueField'), this._translateService.instant(field), value),
    minlength: (field, length) => formatString(this._translateService.instant('MinlengthField'), this._translateService.instant(field), length),
    maxlength: (field, length) => formatString(this._translateService.instant('MaxlengthField'), this._translateService.instant(field), length),
    minContentSize: (field, length) => formatString(this._translateService.instant('MinContentSizeField'), this._translateService.instant(field), length),
    maxContentSize: (field, length) => formatString(this._translateService.instant('MaxContentSizeField'), this._translateService.instant(field), length),
    minNumber: (field, value) => formatString(this._translateService.instant('MinNumberField'), this._translateService.instant(field), value),
    maxNumber: (field, value) => formatString(this._translateService.instant('MaxNumberField'), this._translateService.instant(field), value),
    pattern: (field) => formatString(this._translateService.instant('PatternField'), this._translateService.instant(field)),
    InvalidPasswordPattern: (field) => formatString(this._translateService.instant('InvalidPasswordPattern'), this._translateService.instant(field)),
    InvalidEmail: (field) => formatString(this._translateService.instant('InvalidEmail'), this._translateService.instant(field)),
    InvalidConfirmedPassword: (field) => formatString(this._translateService.instant('InvalidConfirmedPassword'), this._translateService.instant(field)),
    endDateSmallerThanStartDate: (field) => formatString(this._translateService.instant('endDateSmallerThanStartDate'), this._translateService.instant(field)),
    noSpecialChars: (field) => formatString(this._translateService.instant('noSpecialChars'), this._translateService.instant(field)),
    noSpecialCharsAndSpaces: (field) => formatString(this._translateService.instant('noSpecialCharsAndSpaces'), this._translateService.instant(field)),
    arabicCharacters: (field) => formatString(this._translateService.instant('arabicCharacters'), this._translateService.instant(field)),
    englishCharacters: (field) => formatString(this._translateService.instant('englishCharacters'), this._translateService.instant(field)),
    CharactersOnly: (field) => formatString(this._translateService.instant('CharactersOnly'), this._translateService.instant(field)),
    numbersCharacters: (field) => formatString(this._translateService.instant('numbersCharacters'), this._translateService.instant(field)),
    requiredOutputRequests: (field) => formatString(this._translateService.instant('requiredOutputRequests'), this._translateService.instant(field)),
    hourExceedsTotal: (field) => formatString(this._translateService.instant('hourExceedsTotal'), this._translateService.instant(field)),
  };

  getNumberValidationMessage(fieldName: string, requiredMinNumber: number = 0, requiredMaxNumber: number) {
    return {
      minlength: this._translateService
        .instant('MinlengthField_num')
        .replace('{0}', this._translateService.instant(fieldName))
        .replace('{1}', requiredMinNumber.toString()),
      maxlength: this._translateService
        .instant('MaxlengthField_num')
        .replace('{0}', this._translateService.instant(fieldName))
        .replace('{1}', requiredMaxNumber.toString()),
    };
  }

}
import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  match(controlName: string, checkControlName: string): ValidatorFn {

    return (controls: AbstractControl) => {

      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  checkUsername(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.isReservedUser(userControl.value)) {
          resolve({ userExist: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  isReservedUser(username: string) {
    const systemUsers = ['admin', 'user', 'superadmin'];
    return (systemUsers.indexOf(username) > -1);
  }

  validateInputText(control: AbstractControl) {
    if (control.value.length <= 3) {
      return { invalidInput: true };
    }
    return null;
  }

  rangeValidator(min: number, max: number) {
    return (control: AbstractControl) => {
      if (control.value !== null &&
        (isNaN(control.value) || control.value < min || control.value > max)
      ) {
        return { invalidRange: true };
      }
      return null;
    };
  }

  invalidWords(blacklistedWords: string[]) {
    return (control: AbstractControl) => {

      if (!blacklistedWords) {
        return null;
      }

      let exist = this.checkItemInArray(control.value, blacklistedWords);
      if (exist) {
        return { blacklisted: true };
      }
      return null;
    };
  }

  checkItemInArray(input: string, words: string[]) {
    return words.some(word => input.toLowerCase().includes(word.toLowerCase()));
  }
}

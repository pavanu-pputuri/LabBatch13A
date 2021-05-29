import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
  userNameValidator: any;
  confirmPasswordValidator: any;
  patternValidator(): import("@angular/forms").ValidatorFn | null | undefined {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}

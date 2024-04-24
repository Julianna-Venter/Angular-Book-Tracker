import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** the initial password and the confirmed password has to match */
export function confirmPasswordValidator(
  initPassword: string,
  confirmPassword: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(initPassword)?.value;
    const confirm = control.get(confirmPassword)?.value;

    console.log('console:', password, confirm);

    return password === confirm ? null : { confirmPassword: true };
  };
}

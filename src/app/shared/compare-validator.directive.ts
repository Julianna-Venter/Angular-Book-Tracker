import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** the initial password and the confirmed password has to match */
export const confirmationValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.parent?.get('password');
  const confirmPassword = control.value;

  if (!confirmPassword) {
    return { required: true };
  } else if (password && confirmPassword !== password.value) {
    return { confirm: true };
  }
  return null;
};

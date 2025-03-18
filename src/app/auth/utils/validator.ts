// validators.ts
import { FormGroup } from '@angular/forms';

export const isRequired = (field: string, form: FormGroup) => {
  const control = form.get(field);
  return control && control.touched && control.hasError('required');
};

export const hasEmailError = (form: FormGroup) => {
  const control = form.get('email');
  return control && control.touched && control.hasError('email');
};

import { ValidationErrors, FormGroup, AbstractControl } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const reg = /[0-9]/
  return reg.test(control.value) ? null : { passwordError: '密码只能是数字' }
}


export function passwordEqulaValidator(group: FormGroup): ValidationErrors | null {
  const password = group.get('password')
  const password2 = group.get('password2')

  return password.value === password2.value ? null : { notEqual: '两次密码不一致' }
}
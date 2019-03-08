import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  get email(): AbstractControl {
    return this.registerForm.get('email')
  }
  get password(): AbstractControl {
    return this.registerForm.get('password')
  }
  get password2(): AbstractControl {
    return this.registerForm.get('password2')
  }
  get name(): AbstractControl {
    return this.registerForm.get('profile').get('name')
  }
  get phone(): AbstractControl {
    return this.registerForm.get('profile').get('phone')
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ]],
      password2: ['', [
        Validators.required,
      ]],
      profile: this.fb.group({
        name: ['', [
          Validators.required,
          Validators.maxLength(6)
        ]],
        phone: ['', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11)
        ]],
      })
    })
  }

  onSubmit() {
    console.log(this.registerForm.value);
    // this.authService.login(this.registerForm).then(res => {
    //   let snackBarRef = this.snackBar.open('登录成功！');

    //   // this.router.navigate(['projects'])
    // }).catch(err => {
    //   console.log(err);
    // })
  }
}

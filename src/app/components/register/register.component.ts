import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { passwordEqulaValidator } from 'src/app/validators/validators';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  get email(): AbstractControl {
    return this.registerForm.get('email')
  }
  get password(): AbstractControl {
    return this.registerForm.get('pwd.password')
  }
  get password2(): AbstractControl {
    return this.registerForm.get('pwd.password2')
  }
  get pwd(): FormGroup {
    return this.registerForm.get('pwd') as FormGroup
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
      pwd: this.fb.group({
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15)
        ]],
        password2: ['', [
          Validators.required,
        ]]
      }, { validator: passwordEqulaValidator }),
      role: ['2', [Validators.required]],
      profile: this.fb.group({
        name: ['', [
          Validators.required,
          Validators.maxLength(6)
        ]],
        phone: ['', [
          Validators.required,
          Validators.pattern(/^1(3|4|5|6|7|8|9)\d{9}$/)
        ]],
      })
    })
  }

  // 提交
  onSubmit() {
    const formData = this.registerForm.value
    const newUser = {
      email: formData.email,
      password: formData.pwd.password,
      role: formData.role,
      profile: formData.profile,
    }
    console.log('newUser: ', newUser);
    this.userService.register(newUser).subscribe(res => {
      console.log('res: ', res);
      if (res) {
        alert('注册成功！')
        this.router.navigate(['sub/login'])
        // const snackBarRef = this.snackBar.open('注册成功！', '去登录');
        // snackBarRef.onAction().subscribe(() => {
        //   console.log('The snack-bar action was triggered!');
        // });
        // snackBarRef.afterDismissed().subscribe(() => {
        //   this.router.navigate(['login'])
        // });
      } else {
        // 注册失败
        alert('注册失败！')
      }
    })
  }
}

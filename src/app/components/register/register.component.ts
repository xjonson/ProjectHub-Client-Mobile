import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { passwordEqulaValidator } from 'src/app/validators/validators';
import { UserService } from 'src/app/service/user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { SkillService } from 'src/app/service/skill.service';
import { ResTpl } from 'src/app/models/ResTpl';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  skills: [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
    private fb: FormBuilder,
    private userSrv: UserService,
    private skillService: SkillService,
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
  get skill(): AbstractControl {
    return this.registerForm.get('skill')
  }

  ngOnInit() {
    this.handleGetSkills()
    this.initForm()
  }
  // 表单初始化
  initForm() {
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
      role: [3, [Validators.required]],
      create_time: [new Date()],
      skill: [[]],
      profile: this.fb.group({
        name: ['', [
          Validators.required,
          Validators.maxLength(10)
        ]],
        phone: ['', [
          Validators.required,
          Validators.pattern(/^1(3|4|5|6|7|8|9)\d{9}$/)
        ]],
      })
    })
    console.log(this.registerForm)
  }

  // 获取全部skill
  handleGetSkills() {
    this.skillService.getSkills().subscribe((res: ResTpl) => {
      this.skills = res.data
    })
  }

  // 提交
  onSubmit() {
    const formData = this.registerForm.value
    const newUser = {
      email: formData.email,
      password: formData.pwd.password,
      password2: formData.pwd.password2,
      role: formData.role,
      profile: formData.profile,
      skill: formData.skill,
    }
    this.userSrv.register(newUser).subscribe(res => {
      this.message.info(res.msg);
      if (res.code === 0) {
        this.router.navigate(['sub/login'])
      }
    })
  }
}

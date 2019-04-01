import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { tap, map } from 'rxjs/operators';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResTpl } from 'src/app/models/ResTpl';
import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: []
})
export class UserComponent implements OnInit {
  userInfo: User;
  selfProfile = true;

  constructor(
    private userSrv: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private bottomSheet: MatBottomSheet,
    private elementRef: ElementRef,
    private uploadSrv: UploadService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    console.log('user oninit')
    this.handleGetUserInfo()
  }

  // 获取用户信息
  handleGetUserInfo() {
    this.route.queryParams.pipe(
      map(params => {
        return params['id']
      })
    ).subscribe(
      id => {
        this.selfProfile = true
        // 如果是查看别人的 profile 则设置 selfProfile 为 false
        if (id) this.selfProfile = false
        // 获取用户信息
        this.userSrv.getUserInfo(id).subscribe(
          (res: ResTpl) => {
            this.userInfo = res.data
          }
        )
      }
    )

  }
  // 退出登录
  handleLoginOut() {
    this.authService.logout()
  }
  // 修改信息
  openChangeInfo(): void {
    const bs = this.bottomSheet.open(ChangeInfoBottomSheet);
    bs.afterDismissed().subscribe(() => {
      this.handleGetUserInfo()
    })
  }
  // 修改密码
  openChangePwd(): void {
    this.bottomSheet.open(ChangePwdBottomSheet);
  }
  // 选择图片
  handleChooseImg() {
    const input = this.elementRef.nativeElement.querySelector(`#avatar-input`)
    input.click()
  }
  // 头像上传
  uploadImg(e): void {
    const input = this.elementRef.nativeElement.querySelector(`#avatar-input`)
    const file = e.target.files[0]
    console.log('file: ', file);
    this.uploadSrv.uploadImg(file).pipe(
      map((res: ResTpl) => {
        if (res.code === 0) return res.data
      })
    ).subscribe(path => {
      this.userInfo.profile.avatar = 'api/' + path
      this.userSrv.updateUserInfo(this.userInfo).subscribe(
        (res: ResTpl) => {
          if (res.code === 0) {
            // 清空input
            input.value = ''
            this.snackBar.open('头像更新成功')
          }
        }
      )
    })
  }
}



@Component({
  selector: 'change-pwd-bottom-sheet',
  template: `
    <form [formGroup]="pwdFrom" (ngSubmit)="onSubmit()" style="padding: 30px 0;">
      <mat-form-field appearance="outline">
        <mat-label>原密码</mat-label>
        <input matInput formControlName="oldPwd" required>
        <mat-hint>10个字以内</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>新密码</mat-label>
        <input matInput formControlName="newPwd" required minlength="6" maxlength="16">
        <mat-hint>10个字以内</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>重复新密码</mat-label>
        <input matInput formControlName="reNewPwd" required minlength="6" maxlength="16">
        <mat-hint>10个字以内</mat-hint>
      </mat-form-field>
      <button class="mt-3" mat-raised-button color="accent" block type="submit">确认修改</button>      
    </form>
  `,
})
export class ChangePwdBottomSheet {
  pwdFrom: FormGroup = this.fb.group({
    oldPwd: ['', Validators.required],
    newPwd: ['', Validators.required],
    reNewPwd: ['', Validators.required],
  })

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<ChangePwdBottomSheet>,
    private fb: FormBuilder,
    private userSrv: UserService,
    private authSrv: AuthService,
  ) { }

  onSubmit() {
    const form = this.pwdFrom.value
    if (form.newPwd !== form.reNewPwd) return alert('两次密码不一致')
    this.userSrv.updatePassword(form.oldPwd, form.newPwd).subscribe(
      (res: ResTpl) => {
        if (res.code === 0) {
          alert('修改成功，请重新登录')
          this.authSrv.logout()
          this.bottomSheetRef.dismiss();
        }
      }
    )
  }
}

@Component({
  selector: 'change-info-overview-example-sheet',
  template: `
    <form [formGroup]="infoFrom" 
      (ngSubmit)="onSubmit()" 
      style="padding: 30px 0;">
      <mat-form-field appearance="outline">
        <mat-label>昵称</mat-label>
        <input matInput formControlName="name" required maxlength="10">
        <mat-hint></mat-hint>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>电话</mat-label>
        <input matInput formControlName="phone" required maxlength="11">
        <mat-hint></mat-hint>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>简介</mat-label>
        <input matInput formControlName="desc">
        <mat-hint></mat-hint>
      </mat-form-field>
      <button class="mt-3" mat-raised-button color="accent" block type="submit">确认修改</button>      
    </form>
  `,
})
export class ChangeInfoBottomSheet {
  profile = this.userSrv.userInfo.profile
  infoFrom: FormGroup = this.fb.group({
    name: [this.userSrv.userInfo.profile.name, Validators.required],
    phone: [this.userSrv.userInfo.profile.phone, [
      Validators.required,
      Validators.pattern(/^1(3|4|5|6|7|8|9)\d{9}$/)
    ]],
    desc: [this.userSrv.userInfo.profile.desc]
  })

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<ChangeInfoBottomSheet>,
    private fb: FormBuilder,
    private userSrv: UserService,
    private authSrv: AuthService,
  ) {
  }

  onSubmit() {
    const form = this.infoFrom.value
    this.userSrv.userInfo.profile.name = form.name
    this.userSrv.userInfo.profile.phone = form.phone
    this.userSrv.userInfo.profile.desc = form.desc
    this.userSrv.updateUserInfo(this.userSrv.userInfo).subscribe(res => {
      if (res.code === 0) {
        alert('修改成功')
        this.bottomSheetRef.dismiss();
      }
    })
  }
}
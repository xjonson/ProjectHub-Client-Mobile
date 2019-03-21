import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { tap, map } from 'rxjs/operators';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
          (user: User) => {
            this.userInfo = user
          }
        )
      }
    )

  }
  handleLoginOut() {
    this.authService.logout()
    this.router.navigate(['sub/login'])
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
}



@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  template: `
    <form [formGroup]="pwdFrom" (ngSubmit)="onSubmit()" style="padding: 30px 0;">
      <mat-form-field appearance="outline">
        <mat-label>原密码</mat-label>
        <input matInput formControlName="oldPwd" required>
        <mat-hint>10个字以内</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>新密码</mat-label>
        <input matInput formControlName="newPwd" required>
        <mat-hint>10个字以内</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>重复新密码</mat-label>
        <input matInput formControlName="reNewPwd" required>
        <mat-hint>10个字以内</mat-hint>
      </mat-form-field>
      <button class="mt-3" mat-raised-button color="accent" block type="submit">确认修改</button>      
    </form>
  `,
})
export class BottomSheetOverviewExampleSheet {
  pwdFrom: FormGroup = this.fb.group({
    oldPwd: ['', Validators.required],
    newPwd: ['', Validators.required],
    reNewPwd: ['', Validators.required],
  })

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    private fb: FormBuilder,
    private userSrv: UserService,
    private authSrv: AuthService,
  ) { }

  onSubmit() {
    const newUser: Partial<User> = {
      password: this.pwdFrom.value.newPwd
    }
    this.userSrv.updateUserInfo(this.userSrv.userInfo.id, newUser).subscribe(
      () => {
        alert('修改成功，请重新登录')
        this.authSrv.logout()
        this.bottomSheetRef.dismiss();
      }
    )
  }
}
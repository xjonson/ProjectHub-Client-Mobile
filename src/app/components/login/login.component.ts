import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ResTpl } from 'src/app/models/ResTpl';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Partial<User> = {
    email: '',
    password: '',
    // email: 'dev1@ph.com',
    // password: '123123',
  }

  constructor(
    private authSrv: AuthService,
    private userSrv: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userSrv.login(this.user).subscribe((resTpl: ResTpl) => {
      if (resTpl.code === 0) {
        const user = resTpl.data
        localStorage.setItem('ph-token', user.token)
        this.message.info(`登录成功！欢迎您，${user.profile.name}`);
        // 重定向到授权前的路由
        this.router.navigate([this.authSrv.redirectUrl], {
          replaceUrl: true,
        })
      } else {
        this.message.info(resTpl.msg)
      }
    })
  }

  fakeLogin(i) {
    const user = {
      email: i === 1 ? 'demand1@ph.com' : 'dev1@ph.com',
      password: '123123',
    }
    this.userSrv.login(user).subscribe((resTpl: ResTpl) => {
      if (resTpl.code === 0) {
        const user = resTpl.data
        localStorage.setItem('ph-token', user.token)
        this.message.info(`登录成功！欢迎您，${user.profile.name}`);
        // 重定向到授权前的路由
        this.router.navigate([this.authSrv.redirectUrl], {
          replaceUrl: true,
        })
      } else {
        this.message.info(resTpl.msg)
      }
    })
  }
}

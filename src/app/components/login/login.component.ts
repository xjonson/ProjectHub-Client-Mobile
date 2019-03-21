import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'src/app/service/cookie.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Partial<User> = {
    email: '',
    password: '',
  }

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public cookieSrv: CookieService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authSrv.login(this.user).subscribe((users: User[]) => {
      if (users.length) {
        const user = users[0]
        this.cookieSrv.setCookie('ph-user', user.id, 24 * 60 * 60)
        this.snackBar.open(`登录成功！欢迎您，${user.profile.name}`);
        // 重定向到授权前的路由
        this.router.navigate([this.authSrv.redirectUrl], {
          replaceUrl: true,
        })
      }
    })
  }

  fakeLogin(i) {
    const user = {
      email: i === 1 ? 'demand1@ph.com' : 'dev1@ph.com',
      password: '123123',
    }
    this.authSrv.login(user).subscribe((users: User[]) => {
      if (users.length) {
        const user = users[0]
        this.cookieSrv.setCookie('ph-user', user.id, 24 * 60 * 60)
        this.snackBar.open(`登录成功！欢迎您，${user.profile.name}`);
        // 重定向到授权前的路由
        this.router.navigate([this.authSrv.redirectUrl], {
          replaceUrl: true,
        })
      }
    })

  }


}

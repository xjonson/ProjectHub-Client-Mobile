import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Partial<User> = {
    email: 'jonson@ph.com',
    password: 'jonson',
  }

  @Output() subTitle: string = '请登录';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.user).then((user: User) => {
      this.snackBar.open(`登录成功！欢迎您，${user.profile.name}`);
      // 跳转到授权前的路由
      const { redirectUrl, queryParams } = this.authService
      // 中文 解码
      if (queryParams) {
        for (let key of Object.keys(queryParams)) {
          queryParams[key] = decodeURI(queryParams[key])
        }
      }
      // 重定向
      this.router.navigate([redirectUrl], {
        replaceUrl: true,
        queryParams
      })

    }).catch(err => {
      this.snackBar.open(err);
      console.log(err);
    })
  }
}

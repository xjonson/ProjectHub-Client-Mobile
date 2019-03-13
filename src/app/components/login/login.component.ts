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
      // 重定向到授权前的路由
      this.router.navigate([this.authService.redirectUrl], {
        replaceUrl: true,
      })
    }).catch(err => {
      this.snackBar.open(err);
      console.log(err);
    })
  }
}

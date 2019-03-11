import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


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
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.user).then((user: User) => {
      this.snackBar.open(`登录成功！欢迎您，${user.profile.name}`);
      this.router.navigate(['projects'])
    }).catch(err => {
      this.snackBar.open(err);
      console.log(err);
    })
  }
}

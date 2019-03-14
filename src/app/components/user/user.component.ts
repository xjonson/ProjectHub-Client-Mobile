import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userInfo: User;

  constructor(
    private userSrv: UserService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // 获取用户信息
    this.userSrv.getUserInfo().subscribe(
      (user: User) => {
        this.userInfo = user
      }
    )
  }

  handleLoginOut() {
    this.authService.logout()
    this.router.navigate(['sub/login'])
  }
}

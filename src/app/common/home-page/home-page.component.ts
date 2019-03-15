import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  newMsg: number;
  userInfo: User;

  constructor(
    private userSrv: UserService,
    private authSrv: AuthService,
  ) { }

  ngOnInit() {
    // 对于用户未登录就可以访问的页面，只有用户登录后才获取用户信息
    if (this.authSrv.getAuthState()) {
      this.handleGetUserInfo()
    }
  }

  // 获取未读信息数量
  handleGetUserInfo() {
    this.userSrv.getUserInfo().subscribe(
      (user: User) => {
        this.userInfo = user
        this.newMsg = user.msgs.filter(msg => {
          return !msg.checked
        }).length
      }
    )
  }

}

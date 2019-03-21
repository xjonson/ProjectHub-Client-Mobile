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
  }
  ngDoCheck(): void {
    this.handleGetUserInfo()
  }
  // 获取未读信息数量
  handleGetUserInfo() {
    this.userInfo = this.userSrv.userInfo
    if (this.userInfo && this.userInfo.msgs) {
      this.newMsg = this.userInfo.msgs.filter(msg => !msg.checked).length
    }
  }

}

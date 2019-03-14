import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';

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
  ) { }

  ngOnInit() {
    this.handleGetUserInfo()
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

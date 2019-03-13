import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userInfo: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    // 获取用户信息
    this.userInfo = this.userService.getUserInfo()
  }

}

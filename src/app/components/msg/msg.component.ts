import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User, Msg } from 'src/app/models/User';
import { Router } from '_@angular_router@7.2.8@@angular/router';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {
  userInfo: User;

  constructor(
    private userSrv: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.handleGetUserInfo()
  }

  // 获取未读信息数量
  handleGetUserInfo() {
    this.userSrv.getUserInfo().subscribe(
      (user: User) => {
        this.userInfo = user
      }
    )
  }

  // 全部标记为已读
  allChecked() {
    this.userInfo.msgs.forEach(msg => msg.checked = true)
    this.userSrv.updateUserInfo(this.userInfo.id, this.userInfo).subscribe(
      (user: User) => {
        this.userInfo = user
      }
    )
  }
  // 标记为已读并跳转到项目
  navigateToProject(msg: Msg, i: number): void {
    this.userInfo.msgs[i].checked = true
    this.userSrv.updateUserInfo(this.userInfo.id, this.userInfo).subscribe(
      () => {
        this.router.navigate(['/sub/project', msg.project_id], {
          queryParams: { project_msg_id: msg.project_msg_id }
        })
      }
    )
  }

}

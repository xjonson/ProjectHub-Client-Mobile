import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';
import { Router } from '_@angular_router@7.2.8@@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/Project';
import { Msg } from 'src/app/models/Msg';
import { MsgService } from 'src/app/service/msg.service';
import { ResTpl } from 'src/app/models/ResTpl';

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
    public snackBar: MatSnackBar,
    private projectSrv: ProjectService,
    private msgSrv: MsgService,
  ) { }

  ngOnInit() {
    this.handleGetMsgs()
  }

  // 获取未读信息数量
  handleGetMsgs() {
    this.msgSrv.getMsgs().subscribe(
      (res: ResTpl) => {
        console.log('res: ', res);

      }
    )
  }

  // 全部标记为已读
  allChecked() {
    
  }
  // 删除已读
  delChecked() {
    
  }
  // 标记为已读并跳转到项目
  navigateToProject(msg: Msg): void {
    msg.checked = true
    this.userSrv.updateUserInfo(this.userInfo._id, this.userInfo).subscribe(
      () => {
        this.router.navigate(['/sub/project', msg.project_id], {
          queryParams: { project_msg_id: msg.project_msg_id }
        })
      }
    )
  }
  // 操作通知
  actionMsg(msg: Msg, confirm: boolean) {
    
    // 点击取消或管理员信息，直接跳过
    if (confirm && msg.action !== 0) {
      const pid = msg.project_id
      this.projectSrv.getProject(pid).subscribe(
        (project: Project) => {
          // 更新状态
          project.status = msg.action as number
          project.dev_user = msg.from_user
          // 更新
          this.projectSrv.updateProject(pid, project).subscribe(
            () => {
              this.snackBar.open(`操作成功`);
            }
          )
        }
      )
    } else {
      // 删除取消处理的
      
    }
    msg.checked = true
    this.userSrv.updateUserInfo(this.userInfo._id, this.userInfo).subscribe()


  }

}

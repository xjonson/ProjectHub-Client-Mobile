import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User, Msg } from 'src/app/models/User';
import { Router } from '_@angular_router@7.2.8@@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/Project';

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
    if (this.userInfo.msgs.every(msg => msg.checked)) return
    this.userInfo.msgs.forEach(msg => msg.checked = true)
    this.userSrv.updateUserInfo(this.userInfo.id, this.userInfo).subscribe(
      (user: User) => {
        this.userInfo = user
      }
    )
  }
  // 删除已读
  delChecked() {
    if (!this.userInfo.msgs.length) return
    const myConfirm = confirm('删除后不可恢复，确认删除？')
    if (!myConfirm) return
    const arr = this.userInfo.msgs.filter(msg => !msg.checked)
    const newUser = {
      msgs: arr
    }
    this.userSrv.updateUserInfo(this.userInfo.id, newUser).subscribe(
      (user: User) => {
        this.snackBar.open(`删除成功`);
        this.userInfo = user
      }
    )
  }
  // 标记为已读并跳转到项目
  navigateToProject(msg: Msg): void {
    msg.checked = true
    this.userSrv.updateUserInfo(this.userInfo.id, this.userInfo).subscribe(
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
      this.userInfo.msgs.forEach((item, index) => {
        if (item.id === msg.id) {
          this.userInfo.msgs.splice(index, 1)
        }
      })
    }
    msg.checked = true
    this.userSrv.updateUserInfo(this.userInfo.id, this.userInfo).subscribe()


  }

}
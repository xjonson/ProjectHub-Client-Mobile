import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
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
  msgs: Msg[] = [];

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

  // 获取信息
  handleGetMsgs() {
    this.msgSrv.getMsgs().subscribe(
      (res: ResTpl) => {
        if (res.code === 0) {
          this.msgs = res.data
        }
      }
    )
  }
  // 删除已读
  delChecked() {
    const myConfirm = confirm('删除后不可恢复！确认删除？')
    if(!myConfirm) return
    this.msgSrv.delReadMsg().subscribe(
      () => {
        this.handleGetMsgs()
      }
    )
  }
  // 标记为已读并跳转到项目
  navigateToProject(msg: Msg): void {
    msg.checked = true
    this.msgSrv.readMsg(msg._id).subscribe(
      (res: ResTpl) => {
        if (res.code === 0) {
          this.router.navigate(['/sub/project', msg.project_id], {
            queryParams: { 'project_comment_id': msg.project_comment_id }
          })
        }
      }
    )
  }
  // 操作通知
  actionMsg(msg: Msg, confirm: boolean) {
    // 确认：更新项目状态
    if (confirm) {
      this.projectSrv.updateProjectStatus(msg.project_id, msg.action, msg.from_user).subscribe()
    }
    // 统一操作：
    // 已读
    this.msgSrv.readMsg(msg._id).subscribe()
    // 发送反馈信息
    this.sendMsg(msg, confirm)
    // 刷新
    this.handleGetMsgs()
  }

  // 
  sendMsg(msg: Msg, confirm) {
    // 发送反馈消息
    const data = {
      user_id: msg.from_user._id,
      project_id: msg.project_id,
      project_comment_id: null,
      action: 0,
      content: this.userSrv.userInfo.profile.name + `${confirm ? '通过' : '驳回'}了您的更新项目进度申请`
    }
    this.msgSrv.sendMsg(data).subscribe()
  }

}

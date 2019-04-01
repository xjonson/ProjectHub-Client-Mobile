import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/service/project.service';
import { User } from 'src/app/models/User';

import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material';
import { ResTpl } from 'src/app/models/ResTpl';
import { MsgService } from 'src/app/service/msg.service';
import { Action } from 'src/app/models/Msg';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  commentContent: string;
  showHelp = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectSrv: ProjectService,
    public userSrv: UserService,
    private snackBar: MatSnackBar,
    private msgSrv: MsgService,
  ) { }

  ngOnInit() {
    this.handleGetProj()
  }


  // 获取项目详情
  handleGetProj(): void {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.projectSrv.getProject(id).subscribe((res: ResTpl) => {
        if (res.code === 0) {
          const proj = res.data
          this.project = proj
          this.projectSrv.setTitle(proj.title)
        }
      })
    })
  }

  // 添加评论
  addComment(): void {
    this.projectSrv.addProjectComment(this.project._id, this.commentContent).subscribe(
      (res: ResTpl) => {
        if (res.code == 0) {
          this.snackBar.open('评论成功')
          const data = res.data
          this.handleGetProj()
          // 不给自己推送消息
          if (this.project.demand_user._id !== this.userSrv.userInfo._id) {
            this.sendCommentMsg(this.commentContent, data.comments[data.comments.length - 1]._id)
          }
          this.commentContent = ''
        }
      }
    )
  }

  // 申请更新项目状态 进度
  applyProject(action) {
    console.log('action: ', action);
    const userInfo = this.userSrv.userInfo
    this.route.params.subscribe(params => {
      const id = params['id']
      this.projectSrv.getProject(id).subscribe((res: ResTpl) => {
        if (res.code === 0) {
          const proj = res.data
          this.project = proj
          // 如果applys中有相同用户id和aciton=status，说明已经申请过
          const hasApply = proj.applys.filter(i => {
            return i.user_id === userInfo._id && i.status == action && new Date().getTime() <= i.deadline
          }).length
          if (hasApply) {
            this.snackBar.open('您24小时之内已经申请过了，请等待需求发布者反馈')
          } else {
            // 更新项目apply
            const data = {
              apply: {
                user_id: userInfo._id,
                status: action,
                deadline: new Date().getTime() + (1 * 24 * 3600 * 1000)
              }
            }
            this.projectSrv.updateProject(this.project._id, data).subscribe(
              () => {
                // 发送申请消息
                const content = userInfo.profile.name + Action[action]
                this.sendCommentMsg(content, null, action)
              }
            )
          }
        }
      })
    })

  }

  // 推送需要操作的消息
  sendCommentMsg(content: string, project_comment_id, action = 0): void {
    const data = {
      user_id: this.project.demand_user._id,
      project_id: this.project._id,
      project_comment_id,
      action,
      content
    }
    this.msgSrv.sendMsg(data).subscribe()
  }

}

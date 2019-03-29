import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/service/project.service';
import { User } from 'src/app/models/User';

import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material';
import { ResTpl } from 'src/app/models/ResTpl';
import { MsgService } from 'src/app/service/msg.service';

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
    private userSrv: UserService,
    private snackBar: MatSnackBar,
    private msgSrv: MsgService,
  ) { }

  ngOnInit() {
    // 获取项目详情
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

  // 申请更新项目状态 进度
  applyProject(action) {
    // 给需求者发消息
    const demand_user_id = this.project.demand_user._id
    const dev_user_no_msg = Object.assign(this.userSrv.userInfo, { msgs: [] })
    this.userSrv.getUserInfo(demand_user_id).subscribe(
      (demander: User) => {

      }
    )
  }

  // 添加评论
  addComment(): void {
    const obj = {
      content: this.commentContent
    }
    this.projectSrv.updateProject(this.project._id, obj).subscribe(
      (res: ResTpl) => {
        this.commentContent = ''
        if (res.code == 0) {
          this.handleGetProj()
          this.sendCommentMsg(obj.content)
        }
      }
    )
  }


  // 推送评论消息
  sendCommentMsg(content: string): void {
    const data = {
      user_id: this.project.demand_user._id,
      project_id: this.project._id,
      action: 0,
      // project_comment_id,
      content
    }
    console.log('data: ', data);
    this.msgSrv.sendMsg(data).subscribe(
      (res: ResTpl) => {
        console.log('res: ', res);
      }
    )
  }

}

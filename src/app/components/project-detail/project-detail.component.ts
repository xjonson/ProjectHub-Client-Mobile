import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/service/project.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  userInfo: User;
  commentContent: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectSrv: ProjectService,
    private userSrv: UserService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    // 获取项目详情
    this.handleGetProj()
    // 获取用户信息
    this.userSrv.getUserInfo().subscribe(
      (user: User) => {
        this.userInfo = user
      }
    )
    
  }


  // 获取项目详情
  handleGetProj(): void {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.projectSrv.getProject(id).subscribe(proj => {
        this.project = proj
        this.projectSrv.setTitle(proj.title)
        console.log('this.project: ', this.project);
      })
    })
  }

  // 添加评论
  addComment(): void {
    if (!this.commentContent) return
    const project_msg_id = this.project.comments ? 'id' + this.project.comments.length : 'id0'
    // 构造一个没有msgs的user，方便作为参数
    const user_no_msg = Object.assign(this.userInfo, {msgs: []})

    // 构造新项目--comments
    const updateProj = {
      comments: [
        ...this.project.comments,
        {
          id: project_msg_id,
          user: user_no_msg,
          create_time: new Date(),
          content: this.commentContent
        }
      ]
    } as Partial<Project>

    // 请求服务，发布评论
    this.projectSrv.updateProject(this.project.id, updateProj).subscribe(
      (proj: Project) => {
        this.project = proj
        this.snackBar.open(`评论成功！`);

        // 如果是恢回复自己的项目，则不给自己推送消息
        if (this.project.demand_user.id === this.userInfo.id) {
          // 清空输入框
          this.commentContent = ''
          return
        }

        // 给项目发布者用户推送消息
        else {
          this.userSrv.getUserInfo(this.project.demand_user.id).subscribe(
            (demand_user: User) => {
              // 构造新用户信息--msgs
              const updateUser = {
                msgs: [
                  ...demand_user.msgs,
                  {
                    id: demand_user.msgs.length,
                    project_id: this.project.id,
                    project_msg_id,
                    from_user: user_no_msg,
                    content: this.commentContent,
                    checked: false,
                    create_time: new Date(),
                  }
                ]
              } as User
              // 请求服务，推送消息
              this.userSrv.updateUserInfo(demand_user.id, updateUser).subscribe(
                updateUser => {
                  console.log(updateUser);
                }
              )
              // 清空输入框
              this.commentContent = ''
            }
          )

        }
      }
    )
  }
}

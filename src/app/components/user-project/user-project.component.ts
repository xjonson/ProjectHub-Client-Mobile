import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';
import { ResTpl } from 'src/app/models/ResTpl';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: [
    './user-project.component.sass',
    '../projects/projects.component.scss', '../project-detail/project-detail.component.scss'
  ]
})
export class UserProjectComponent implements OnInit {
  projects: Project[];
  constructor(
    private projectSrv: ProjectService,
    public userSrv: UserService,
  ) { }

  ngOnInit() {
    this.handleGetProjects()
  }
  // 获取全部项目
  handleGetProjects() {
    this.projectSrv.getProjects().subscribe(
      (res: ResTpl) => {
        if (res.code === 0) {
          this.projects = res.data.filter(item => {
            // 展示skill
            item.skills = item.skills.split(',')
            // 截取desc
            // item.desc = item.desc.substr(0, 100) + '...'
            const user_id = this.userSrv.userInfo._id
            if (item.dev_user) {
              return item.demand_user._id == user_id || item.dev_user._id == user_id
            } else {
              return item.demand_user._id == user_id
            }
          }).reverse()
        }
      }
    )
  }

}

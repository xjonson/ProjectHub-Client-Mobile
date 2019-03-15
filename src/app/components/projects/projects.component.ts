import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../project-detail/project-detail.component.scss', './projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[]
  userInfo: User


  constructor(
    private projectSrv: ProjectService,
    private userSrv: UserService,
    private authSrv: AuthService,
  ) { }

  ngOnInit() {
    // 对于用户未登录就可以访问的页面，只有用户登录后才获取用户信息
    if (this.authSrv.getAuthState()) {
      // 获取用户信息
      this.userSrv.getUserInfo().subscribe(
        (user: User) => {
          this.userInfo = user
        }
      )
    }
    // 
    this.handleGetProjects()
  }

  handleGetProjects() {
    this.projectSrv.getProjects().subscribe(
      (val: Project[]) => {
        // console.log(val);
        val.map(item => {
          item.desc = item.desc.substr(0, 100) + '...'
        })
        this.projects = val
      }
    )
  }

}

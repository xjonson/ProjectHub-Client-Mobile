import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../project-detail/project-detail.component.scss', './projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[]
  userInfo: User


  constructor(
    private projectService: ProjectService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // 获取用户信息
    this.userInfo = this.userService.getUserInfo()
    // 
    this.handleGetProjects()
  }

  handleGetProjects() {
    this.projectService.getProjects().subscribe(
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

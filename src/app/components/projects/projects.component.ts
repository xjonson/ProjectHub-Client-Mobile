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


  constructor(
    private projectSrv: ProjectService,
    public userSrv: UserService,
  ) { }

  ngOnInit() {
    this.handleGetProjects()
  }

  handleGetProjects() {
    this.projectSrv.getProjects().subscribe(
      (val: Project[]) => {
        // console.log(val);
        this.projects = val.filter(item => {
          item.desc = item.desc.substr(0, 100) + '...'
          return item.audit === 1
        })
      }
    )
  }

}

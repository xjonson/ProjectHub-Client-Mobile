import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/Project';
import { UserService } from 'src/app/service/user.service';
import { ResTpl } from 'src/app/models/ResTpl';
import { Router } from '@angular/router';

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
    private router: Router,
  ) { }

  ngOnInit() {
    this.handleGetProjects()
  }

  handleGetProjects() {
    this.projectSrv.getProjects().subscribe(
      (res: ResTpl) => {
        if (res.code === 0) {
          this.projects = res.data.filter(item => {
            item.skills = item.skills.split(',')
            item.desc = item.desc.substr(0, 100) + '...'
            return item.audit === 1
          })
        }
      }
    )
  }

  pushToAddProject() {
    if (this.userSrv.userInfo.audit === 1) {
      this.router.navigate(['/sub/project-edit/0'])
    } else {
      alert('您的账号正在审核，审核成功后才能发布项目')
    }
  }

}

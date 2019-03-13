import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/service/project.service';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  userInfo: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // 获取项目详情
    this.handleGetProj()
    // 获取用户信息
    this.userInfo = this.userService.getUserInfo()

  }
  navigateTo2() {
    this.router.navigate(['/sub/project', 2])
  }
  // 获取项目详情
  handleGetProj(): void {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.projectService.getProject(id).subscribe(proj => {
        this.project = proj
        this.projectService.setTitle(proj.title)
        console.log('this.project: ', this.project);
      })
    })
  }

}

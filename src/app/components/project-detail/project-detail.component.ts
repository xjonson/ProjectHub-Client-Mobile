import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private projectService: ProjectService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // 获取项目详情
    this.handleGetProj()
    // 获取用户信息
    this.userInfo = this.userService.getUserInfo()

  }

  // 获取项目详情
  handleGetProj(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.projectService.getProject(id).subscribe(proj => {
      this.project = proj
      console.log('this.project: ', this.project);
    })
  }

}

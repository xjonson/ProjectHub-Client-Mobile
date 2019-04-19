import { Component, OnInit } from '@angular/core';
import { ProjectStepService } from 'src/app/service/project-step.service';
import { ProjectService } from 'src/app/service/project.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { ResTpl } from 'src/app/models/ResTpl';
import { ProjectStep } from 'src/app/models/ProjectStep';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project-assess-step2',
  templateUrl: './project-assess-step2.component.html',
  styleUrls: ['./project-assess-step2.component.scss']
})
export class ProjectAssessStep2Component implements OnInit {
  selectPSList: ProjectStep[];
  project: Project;

  constructor(
    private projStepSrv: ProjectStepService,
    private projectSrv: ProjectService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getProjcetDetail()
  }

  // 获取项目详情
  getProjcetDetail() {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.projectSrv.getProject(id).subscribe((resTpl: ResTpl) => {
        if (resTpl.code === 0) {
          this.project = resTpl.data
          this.handleGetPS()
          if (this.project.project_fun) {
            // this.selectType = this.project.project_type
          }
        }
      })
    })
  }
  // 获取全部PS
  handleGetPS() {
    console.log('this.projStepSrv: ', this.projStepSrv);
    this.projStepSrv.getProjectStep().subscribe(
      (resTpl: ResTpl) => {
        if (resTpl.code === 0) {
          this.selectPSList = resTpl.data.filter(item => item.type === this.project.project_type)
          console.log('this.selectPSList: ', this.selectPSList);
        }
      }
    )
  }

  submit() {

  }

}

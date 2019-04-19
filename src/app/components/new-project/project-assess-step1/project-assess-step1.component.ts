import { Component, OnInit } from '@angular/core';
import { ProjectStepService } from 'src/app/service/project-step.service';
import { ResTpl } from 'src/app/models/ResTpl';
import { ProjectStep } from 'src/app/models/ProjectStep';
import { NzMessageService } from 'ng-zorro-antd';
import { ProjectService } from 'src/app/service/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project-assess-step1',
  templateUrl: './project-assess-step1.component.html',
  styleUrls: ['./project-assess-step1.component.scss']
})
export class ProjectAssessStep1Component implements OnInit {
  PSList: ProjectStep[];
  project: Project;
  selectType: string;

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
          if (this.project.project_type) {
            this.handleGetPS()
            this.selectType = this.project.project_type
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
          this.PSList = resTpl.data
        }
      }
    )
  }

  // 选择类型
  chooseProjectType(item: ProjectStep) {
    this.selectType = item.type
  }

  // 提交
  submit() {
    if (!this.selectType) return this.message.warning('请选择项目类型')
    const pid = this.route.snapshot.paramMap.get('id')
    this.projectSrv.setProjectType(pid, this.selectType).subscribe(
      (resTpl: ResTpl) => {
        console.log('resTpl: ', resTpl);
        if (resTpl.code === 0) {
          this.router.navigate(['/sub/project-assess-step2', pid], {
            replaceUrl: true
          })
        }
      }
    )
  }
}

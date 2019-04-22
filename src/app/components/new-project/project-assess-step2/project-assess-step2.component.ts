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
  selectPS: ProjectStep;
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
          this.selectPS = resTpl.data.filter(item => item.type === this.project.project_type)[0]
          console.log('this.selectPS: ', this.selectPS);
        }
      }
    )
  }

  // fun1  
  clickFun1(item, index) {
    this.toggleOn(item)
    const isAllChildOn = item.on ? true : false
    this.selectPS.data[index].children.forEach(fun2 => {
      this.toggleOn(fun2, isAllChildOn)
      fun2.children.forEach(fun3 => {
        this.toggleOn(fun3, isAllChildOn)
      });
    });
  }
  // fun2
  clickFun2(item, index1, index2) {
    this.toggleOn(item)
    const isAllChildOn = item.on ? true : false
    this.selectPS.data[index1].children[index2].children.forEach(fun3 => {
      this.toggleOn(fun3, isAllChildOn)
    });
    // 
    if (this.selectPS.data[index1].children.some(i => !i.on)) {
      this.selectPS.data[index1].on = false
    } else {
      this.selectPS.data[index1].on = true
    }
  }
  // fun3
  clickFun3(item, index1, index2, index3) {
    this.toggleOn(item)
    if (this.selectPS.data[index1].children[index2].children.some(i => !i.on)) {
      this.selectPS.data[index1].on = false
      this.selectPS.data[index1].children[index2].on = false
    } else {
      this.selectPS.data[index1].children[index2].on = true
      if (this.selectPS.data[index1].children.every(i => i.on)) {
        this.selectPS.data[index1].on = true
      }
    }
  }
  // 切换on
  toggleOn(item, isAllChildOn = undefined) {
    if (isAllChildOn === true) {
      item.on = true
    } else if (isAllChildOn === false) {
      item.on = false
    } else {
      if (!item.on) {
        item.on = true
      } else {
        item.on = false
      }
    }
  }

  // 下一步
  submit() {
    // if (!this.selectType)
    return this.message.warning('请选择项目类型')
    const pid = this.route.snapshot.paramMap.get('id')
    // this.projectSrv.setProjectType(pid).subscribe(
    //   (resTpl: ResTpl) => {
    //     console.log('resTpl: ', resTpl);
    //     if (resTpl.code === 0) {
    //       this.router.navigate(['/sub/project-assess-step2', pid], {
    //         replaceUrl: false
    //       })
    //     }
    //   }
    // )

  }

}

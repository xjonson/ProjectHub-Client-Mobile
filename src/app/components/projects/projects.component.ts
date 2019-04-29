import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/Project';
import { UserService } from 'src/app/service/user.service';
import { ResTpl } from 'src/app/models/ResTpl';
import { Router } from '@angular/router';
import { SkillService } from 'src/app/service/skill.service';
import { ProjectStepService } from 'src/app/service/project-step.service';
import { ProjectStep } from 'src/app/models/ProjectStep';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../project-detail/project-detail.component.scss', './projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  showFilterExpand = 0
  projects: Project[];
  cycles = [];
  skillList = [];
  PSList: ProjectStep[] = [];
  formData = {
    cycle: 0,
    price: [0, 10000],
    skills: [],
    // 
    project_type: '',
    project_assess: [0, 10000],
  }


  constructor(
    private projectSrv: ProjectService,
    public userSrv: UserService,
    private router: Router,
    private skillService: SkillService,
    private projStepSrv: ProjectStepService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.cycles = this.projectSrv.cycles
    this.handleGetSkills()
    this.handleGetPS()
  }

  // 获取全部skill
  handleGetSkills() {
    this.skillService.getSkills().subscribe((res: ResTpl) => {
      this.skillList = res.data.map(item => {
        item.label = item.name
        item.value = item.id
        return item
      })
      this.handleGetProjects()
    })
  }
  
  // 获取全部项目
  handleGetProjects() {
    this.formData.skills = this.skillList.filter(item => item.checked).map(item => +item.id)
    console.log('this.formData: ', this.formData);
    this.projectSrv.getProjects(this.formData).subscribe(
      (res: ResTpl) => {
        if (res.code === 0) {
          this.projects = res.data.filter(item => {
            // 展示skill
            item.skills = item.skills.split(',')
            // 截取desc
            item.desc = item.desc.substr(0, 100) + '...'
            return item.audit === 1 && item.status < 3
          }).reverse()
        }
      }
    )
  }

  // 添加项目
  pushToAddProject() {
    if (this.userSrv.userInfo.audit === 1) {
      this.router.navigate(['/sub/project-edit/0'])
    } else {
      this.message.warning('您的账号正在审核，审核成功后才能发布项目')
    }
  }

  // 获取全部PS
  handleGetPS() {
    this.projStepSrv.getProjectStep().subscribe(
      (resTpl: ResTpl) => {
        if (resTpl.code === 0) {
          this.PSList = resTpl.data
        }
      }
    )
  }

  // 控制filter-expand
  changeFilterExpand(num) {
    if (this.showFilterExpand === num) {
      this.showFilterExpand = 0
    } else {
      this.showFilterExpand = num
    }
  }

  // 格式
  formatterPrice(value: number): string {
    return `￥${value}`;
  }

  // 全部清除
  clearAllQuery() {
    switch (this.showFilterExpand) {
      case 1:
        this.formData.cycle = 0;
        this.formData.price = [0, 10000];
        this.formData.skills = [];
        this.skillList.forEach(i => i.checked = false);
        break;
      case 2:
        this.formData.project_type = ''
        this.formData.project_assess = [0, 10000];
        break;
    }
    this.handleGetProjects()
  }

  // 按时间 新在上
  sortByNew() {
    this.projects = this.projects.sort((a, b) => {
      return +b.create_time - +a.create_time
    })
  }
  // 按时间 旧在上
  sortByOld() {
    this.projects = this.projects.sort((a, b) => {
      return +a.create_time - +b.create_time
    })

  }
}

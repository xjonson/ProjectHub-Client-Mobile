import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/Project';
import { UserService } from 'src/app/service/user.service';
import { ResTpl } from 'src/app/models/ResTpl';
import { Router } from '@angular/router';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../project-detail/project-detail.component.scss', './projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  showFilterExpand = 0
  projects: Project[];
  cycles = [];
  formData = {
    cycle: 0,
    price: [50, 5000],
    skill: []
  }


  constructor(
    private projectSrv: ProjectService,
    public userSrv: UserService,
    private router: Router,
    private skillService: SkillService,
  ) { }

  ngOnInit() {
    this.cycles = this.projectSrv.cycles
    this.handleGetProjects()
    this.handleGetSkills()
  }

  // 获取全部项目
  handleGetProjects() {
    this.projectSrv.getProjects().subscribe(
      (res: ResTpl) => {
        if (res.code === 0) {
          this.projects = res.data.filter(item => {
            item.skills = item.skills.split(',')
            item.desc = item.desc.substr(0, 100) + '...'
            return item.audit === 1 && item.status < 3
          })
        }
      }
    )
  }

  // 添加项目
  pushToAddProject() {
    if (this.userSrv.userInfo.audit === 1) {
      this.router.navigate(['/sub/project-edit/0'])
    } else {
      alert('您的账号正在审核，审核成功后才能发布项目')
    }
  }

  // 获取全部skill
  handleGetSkills() {
    this.skillService.getSkills().subscribe((res: ResTpl) => {
      this.formData.skill = res.data.map(item => {
        item.label = item.name
        item.value = item.id
        return item
      })
    })
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
}

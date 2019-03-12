import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../project-detail/project-detail.component.scss', './projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[]

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      (val: Project[]) => {
        console.log(val);
        val.map(item => {
          item.desc = item.desc.substr(0, 100) + '...'
        })
        this.projects = val
      }
    )
  }



}

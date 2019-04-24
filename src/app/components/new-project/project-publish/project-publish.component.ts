import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { ResTpl } from 'src/app/models/ResTpl';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project-publish',
  templateUrl: './project-publish.component.html',
  styleUrls: ['./project-publish.component.scss']
})
export class ProjectPublishComponent implements OnInit {
  project: Project;

  constructor(
    private router: Router,
    private projectSrv: ProjectService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.projectSrv.getProject(id).subscribe((resTpl: ResTpl) => {
        if (resTpl.code === 0) {
          this.project = resTpl.data
        }
      })
    })
  }
  submit() {
    this.router.navigate(['/home/project'])
    // this.route.params.subscribe(params => {
    //   const id = params['id']
    //   this.router.navigate(['/sub/project', id], {
    //     replaceUrl: false
    //   })
    // })
  }
}

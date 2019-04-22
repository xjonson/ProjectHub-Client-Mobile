import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SkillService } from 'src/app/service/skill.service';
import { ProjectService } from 'src/app/service/project.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Project } from 'src/app/models/Project';
import { ResTpl } from 'src/app/models/ResTpl';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  skills: [];
  cycles = [];

  constructor(
    private fb: FormBuilder,
    private skillService: SkillService,
    private projectSrv: ProjectService,
    private userSrv: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    // 
    this.cycles = this.projectSrv.cycles
    this.handleGetSkills()
    this.initForm()
  }
  // 获取全部skill
  handleGetSkills() {
    this.skillService.getSkills().subscribe((res: ResTpl) => {
      this.skills = res.data
    })
  }
  // 项目初始化
  initForm() {
    this.projectForm = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      desc: ['', [
        Validators.required
      ]],
      skills: [[]],
      cycle: ['', [
        Validators.required
      ]],
      price: ['', [
        Validators.required
      ]]
    })
  }
  onSubmit() {
    const data = this.projectForm.value
    if (data.skills) {
      data.skills = data.skills.join(',')
    }
    // 项目发布
    this.projectSrv.addProject(data).subscribe((resTpl: ResTpl) => {
      if (resTpl.code === 0) {
        // 进入项目估价系统step1
        this.router.navigate(['/sub/project-assess-step1', resTpl.data._id], {
          replaceUrl: false
        })
        this.message.success('信息提交成功！进入项目估价系统')
        return
        this.modal.success({
          nzTitle: '提示',
          nzContent: '项目发布成功！',
          nzCancelDisabled: false,
          nzCancelText: '取消',
          nzOkText: '查看项目',
          nzOnCancel: () => {
            this.router.navigate(['/home/projects'])
          },
          nzOnOk: () => {
            this.router.navigate(['/sub/project', resTpl.data._id], {
              replaceUrl: true
            })
          }
        });
      }
    })
  }
}



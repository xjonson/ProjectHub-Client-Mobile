import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Skill } from 'src/app/models/Skill';
import { SkillService } from 'src/app/service/skill.service';
import { ProjectService } from 'src/app/service/project.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  skills: []
  cycles = [
    { name: '1天', value: 1 },
    { name: '3天', value: 3 },
    { name: '5天', value: 5 },
    { name: '7天', value: 7 },
    { name: '1个月', value: 30 },
    { name: '3个月', value: 90 },
    { name: '5个月', value: 150 },
    { name: '7个月', value: 210 },
  ]

  constructor(
    private fb: FormBuilder,
    private skillService: SkillService,
    private projectSrv: ProjectService,
    private userSrv: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    // 
    this.handleGetSkills()
    this.initForm()
  }
  handleGetSkills() {
    this.skillService.getSkills().subscribe((skills: []) => {
      this.skills = skills
    })
  }
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
      ]],
      demand_user: [''],
      status: [0],
      comments: [[]],
      create_time: [new Date()]
    })
  }
  onSubmit() {
    const data = this.projectForm.value
    if (data.skills) {
      data.skills = data.skills.join(',')
    }
    this.projectSrv.addProject(data).subscribe((project: Project) => {
      this.dialog.open(addProjectSuccessDialog, {
        data: {
          id: project.id
        }
      });
    })
  }
}


/**
 * @description 发布成功的dialog
 */
@Component({
  selector: 'add-project-success-dialog',
  template: `
    <h2 mat-dialog-title>提示</h2>
    <div mat-dialog-content>
      <p>项目发布成功！</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">取消</button>
      <button mat-button [mat-dialog-close]="true" (click)="onOk()" cdkFocusInitial>查看项目</button>
    </div>
  `,
  styleUrls: ['./project-edit.component.scss']
})
export class addProjectSuccessDialog {

  constructor(
    public dialogRef: MatDialogRef<addProjectSuccessDialog>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCancel() {
    this.dialogRef.close();
    this.router.navigate(['/home/projects'])
  }
  onOk() {
    this.router.navigate(['/sub/project', this.data.id], {
      replaceUrl: true
    })
  }
}


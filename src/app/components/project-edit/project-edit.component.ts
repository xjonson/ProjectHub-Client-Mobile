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
    // this.projectForm = this.fb.group({
    //   title: ['项目', [
    //     Validators.required
    //   ]],
    //   desc: ['项目详情项目详情项目详情项目详情，项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情。', [
    //     Validators.required
    //   ]],
    //   skills: [[]],
    //   cycle: ['12', [
    //     Validators.required
    //   ]],
    //   price: ['2', [
    //     Validators.required
    //   ]]
    // })
  }
  onSubmit() {
    const data = this.projectForm.value
    if (data.skills) {
      data.skills = data.skills.join(',')
    }
    this.projectSrv.addProject(data).subscribe((res: ResTpl) => {
      console.log('res: ', res);
      this.dialog.open(addProjectSuccessDialog, {
        data: res.data
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
    console.log('this.id: ', this.data);
    this.router.navigate(['/sub/project', this.data._id], {
      replaceUrl: true
    })
  }
}


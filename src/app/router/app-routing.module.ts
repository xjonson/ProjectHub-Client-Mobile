import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from '../components/projects/projects.component';
import { UserComponent } from '../components/user/user.component';
import { ProjectDetailComponent } from '../components/project-detail/project-detail.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../service/auth.service';
import { HomePageComponent } from '../common/home-page/home-page.component';
import { SubPageComponent } from '../common/sub-page/sub-page.component';
import { ProjectEditComponent } from '../components/new-project/project-edit/project-edit.component';
import { MsgComponent } from '../components/msg/msg.component';
import { UserProjectComponent } from '../components/user-project/user-project.component';
import { ProjectAssessStep1Component } from '../components/new-project/project-assess-step1/project-assess-step1.component';
import { ProjectAssessStep2Component } from '../components/new-project/project-assess-step2/project-assess-step2.component';
import { ProjectPublishComponent } from '../components/new-project/project-publish/project-publish.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'msgs',
        component: MsgComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'sub',
    component: SubPageComponent,
    children: [
      {
        path: 'project/:id',
        component: ProjectDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project-edit/:id',
        component: ProjectEditComponent,
        canActivate: [AuthGuard],
        // HostGuard
        data: {
          title: '编辑项目需求'
        },
      },
      {
        path: 'project-assess-step1/:id',
        component: ProjectAssessStep1Component,
        canActivate: [AuthGuard],
        data: {
          title: '项目估价 Step1'
        },
      },
      {
        path: 'project-assess-step2/:id',
        component: ProjectAssessStep2Component,
        canActivate: [AuthGuard],
        data: {
          title: '项目估价 Step2'
        },
      },
      {
        path: 'project-publish/:id',
        component: ProjectPublishComponent,
        canActivate: [AuthGuard],
        data: {
          title: '项目发布'
        },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: '注册'
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: '登录'
        }
      },
      {
        path: 'user-project',
        component: UserProjectComponent,
        canActivate: [AuthGuard],
        data: {
          title: '我的项目'
        }
      },
    ]
  },
  {
    path: '',
    redirectTo: 'home/projects',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: '404 Not Found'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import { ProjectEditComponent } from '../components/project-edit/project-edit.component';
import { MsgComponent } from '../components/msg/msg.component';
import { UserProjectComponent } from '../components/user-project/user-project.component';

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

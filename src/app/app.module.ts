import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './router/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// components
import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UserComponent, ChangePwdBottomSheet, ChangeInfoBottomSheet, } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LogoComponent } from './common/logo/logo.component';
import { HomePageComponent } from './common/home-page/home-page.component';
import { SubPageComponent } from './common/sub-page/sub-page.component';
import { ProjectEditComponent } from './components/new-project/project-edit/project-edit.component';
import { MsgComponent } from './components/msg/msg.component';
// pipes
import { ArrayPipe } from './pipes/common.pipe';
import { SkillPipe } from './pipes/skill.pipe';
import { UserRolePipe } from './pipes/user.pipe';
import { ProjectStatusPipe, ProjectStatusPipeText, ProjectColorPipe } from './pipes/project.pipe';
// service
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { SkillService } from './service/skill.service';
import { ProjectService } from './service/project.service';
import { AuthInterceptor } from './service/AuthInterceptor';
import { UploadService } from './service/upload.service';
import { MsgService } from './service/msg.service';
// material
import { AppMaterialModule } from './material.module';
// ng-zorro
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { UserProjectComponent } from './components/user-project/user-project.component';
import { ProjectAssessStep1Component } from './components/new-project/project-assess-step1/project-assess-step1.component';
import { ProjectAssessStep2Component } from './components/new-project/project-assess-step2/project-assess-step2.component';
import { ProjectPublishComponent } from './components/new-project/project-publish/project-publish.component';
import { ProjectStepService } from './service/project-step.service';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    ProjectDetailComponent,
    NotFoundComponent,
    LogoComponent,
    ProjectStatusPipe,
    ProjectStatusPipeText,
    ProjectColorPipe,
    ArrayPipe,
    SkillPipe,
    HomePageComponent,
    SubPageComponent,
    ProjectEditComponent,
    UserRolePipe,
    MsgComponent,
    ChangePwdBottomSheet,
    ChangeInfoBottomSheet,
    UserProjectComponent,
    ProjectAssessStep1Component,
    ProjectAssessStep2Component,
    ProjectPublishComponent,
  ],
  entryComponents: [
    ChangePwdBottomSheet,
    ChangeInfoBottomSheet,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [
    AuthService,
    UserService,
    ProjectService,
    SkillService,
    UploadService,
    MsgService,
    ProjectStepService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SideBarComponent } from './common/side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './common/logo/logo.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectStatusPipe, ProjectStatusPipeText, ProjectColorPipe } from './pipes/project.pipe';
import { ArrayPipe } from './pipes/common.pipe';
import { SkillPipe } from './pipes/skill.pipe';
import { HomePageComponent } from './common/home-page/home-page.component';
import { SubPageComponent } from './common/sub-page/sub-page.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    ProjectDetailComponent,
    NotFoundComponent,
    SideBarComponent,
    LogoComponent,
    ProjectStatusPipe,
    ProjectStatusPipeText,
    ProjectColorPipe,
    ArrayPipe,
    SkillPipe,
    HomePageComponent,
    SubPageComponent,
    ProjectEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

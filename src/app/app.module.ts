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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

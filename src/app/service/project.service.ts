import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectTitle: string;
  constructor(
    private http: HttpClient,
    private userSrv: UserService,
  ) { }


  // 获取全部project
  getProjects(): Observable<any> {
    return this.http.get('api/project')
  }

  // 获取单个project详情
  getProject(id: string): Observable<any> {
    return this.http.get(`api/project/${id}`)
  }
  // 设置title
  setTitle(title: string): void {
    this.projectTitle = title
  }
  // 获取title
  getTitle() {
    // 创建一个Observable对象，subpage订阅值
    return new Observable((observer) => {
      if (this.projectTitle) {
        observer.next(this.projectTitle)
        observer.complete();
      }
      return { unsubscribe() { } };
    })
  }
  // 发布项目
  addProject(data: Project) {
    data = {
      ...data,
      audit: 0,
      demand_user: Object.assign(this.userSrv.userInfo, {msgs: []})
    }
    console.log(data)
    return this.http.post('api/project', data)
  }
  // 更新项目 
  updateProject(id: string, data: Partial<Project>) {
    return this.http.patch(`api/project/${id}`, data)
  }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';
import { map, tap } from 'rxjs/operators';
import { ResTpl } from '../models/ResTpl';
import { MatSnackBar } from '@angular/material';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectTitle: string;
  // 开发周期
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
    private http: HttpClient,
    private userSrv: UserService,
    public snackBar: MatSnackBar,
  ) { }


  // 获取全部project
  getProjects(filter?): Observable<any> {
    let params
    if (filter) {
      params = new HttpParams({
        fromObject: {
          cycle: filter.cycle,
          min_price: filter.price[0],
          max_price: filter.price[1],
          skills: filter.skills
        }
      })
    }

    return this.http.get('api/project', { params }).pipe(
      tap((res: ResTpl) => {
        this.snackBar.open(res.msg);
      })
    )
  }

  // 获取单个project详情
  getProject(id: string): Observable<any> {
    return this.http.get(`api/project/${id}`)
    // .pipe(
    //   tap((res: ResTpl) => {
    //     this.snackBar.open(res.msg);
    //   })
    // )
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
    return this.http.post('api/project', data)
  }

  // 更新项目信息
  updateProject(pid: string, data: any) {
    return this.http.patch(`api/project/${pid}`, data).pipe(
      tap((res: ResTpl) => {
        this.snackBar.open(res.msg);
      })
    )
  }

  // 更新项目评论
  addProjectComment(pid: string, content: string) {
    const obj = {
      content
    }
    return this.http.patch(`api/project/${pid}`, obj).pipe(
      tap((res: ResTpl) => {
        this.snackBar.open(res.msg);
      })
    )
  }

  // 更新项目状态
  updateProjectStatus(pid: string, status: number, dev_user: Partial<User>) {
    const obj = {
      status,
      dev_user,
    }
    return this.http.patch(`api/project/${pid}`, obj).pipe(
      tap((res: ResTpl) => {
        this.snackBar.open(res.msg);
      })
    )
  }
}

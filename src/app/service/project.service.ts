import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  
  // 获取全部project
  getProjects(): Observable<any> {
    return this.http.get('api/project')
  }

  // 获取单个project详情
  getProject(id: number): Observable<any> {
    return this.http.get(`api/project/${id}`)
  }
}

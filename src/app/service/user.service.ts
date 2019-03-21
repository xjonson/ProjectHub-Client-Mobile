import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { map, switchMap, tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: User;

  constructor(
    private http: HttpClient,
    private cookieSrv: CookieService,
  ) { }

  // 用户注册
  register(user: Partial<User>): Observable<any> {
    // 查询邮箱是否已被注册
    return this.http.get('/api/user').pipe(
      switchMap(
        (users: User[]) => {
          if (users.some(u => u.email === user.email)) {
            alert('此邮箱已被注册')
            return new Observable(null)
          } else {
            return this.http.post('/api/user', user)
          }
        },
        (firstHTTPResult, secondHTTPResult) => {
          console.log('secondHTTPResult: ', secondHTTPResult);
          console.log('firstHTTPResult: ', firstHTTPResult);
          return secondHTTPResult
        }
      )
    )
  }

  setUserInfo(user: User) {
    this.userInfo = user
  }

  // 获取用户信息 默认是当前登录用户
  getUserInfo(id: string = (this.userInfo && this.userInfo.id)) {
    if (!id) id = this.cookieSrv.getCookie('ph-user')
    return this.http.get(`/api/user/${id}`).pipe(
      tap(
        (user: User) => {
          if(!this.userInfo || id === this.userInfo.id) this.userInfo = user
        }
      )
    )
  }

  // 更新信息
  updateUserInfo(id: string, data: Partial<User>) {
    return this.http.patch(`api/user/${id}`, data).pipe(
      tap(
        (user: User) => {
          if(!this.userInfo || id === this.userInfo.id) this.userInfo = user
        }
      )
    )
  }
}

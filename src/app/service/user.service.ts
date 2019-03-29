import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { map, switchMap, tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { ResTpl } from '../models/ResTpl';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: User;

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
  ) { }

  // 用户注册
  register(user: Partial<User>): Observable<any> {
    return this.http.post('/api/user/register', user)
  }

  // 用户登录
  login(user: Partial<User>): Observable<any> {
    return this.http.post('/api/user/login', user)
  }

  setUserInfo(user: User) {
    this.userInfo = user
  }

  // 获取用户信息
  getUserInfo(id?: string) {
    if (id) {
      return this.http.get(`/api/user/${id}`)
    } else {
      return this.http.get(`/api/user`).pipe(
        tap((res: ResTpl) => {
          if(res.code === 0) {
            this.userInfo = res.data
          }
        })
      )
    }
  }

  // 更新信息
  updateUserInfo(id: string, data: Partial<User>) {
    return this.http.patch(`api/user/${id}`, data).pipe(
      tap(
        (user: User) => {
          if (!this.userInfo || id === this.userInfo._id) this.userInfo = user
        }
      )
    )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: User;

  constructor(private http: HttpClient) { }


  // 用户注册
  register(user: Partial<User>) {
    return this.http.post('/api/user', user)
  }

  setUserInfo(user: User) {
    this.userInfo = user
  }

  // 获取用户信息 默认是当前登录用户
  getUserInfo(id: string = this.userInfo.id) {
    return this.http.get(`/api/user/${id}`)
  }

  // 更新信息 / 发送消息
  updateUserInfo(id: string, data: Partial<User>) {
    return this.http.patch(`api/user/${id}`, data)
  }
}

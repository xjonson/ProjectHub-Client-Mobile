import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Location } from '@angular/common';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginState = false;
  public redirectUrl: string = 'home/projects';

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  // 登录
  login(loginForm: Partial<User>) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/user').subscribe(
        (users: User[]) => {
          let match = false
          let loginUser: User
          users.forEach((user: User) => {
            if ((loginForm.email === user.email) && (loginForm.password === user.password)) {
              // 匹配
              match = true
              loginUser = user
            }
          });
          // 登录成功
          if (match) {
            this.loginState = true
            this.userService.userInfo = loginUser
            resolve(loginUser)
          } else {
            reject('账户密码错误')
          }
        }),
        error => {
          reject(error)
        }
    })
  }
  // 登出
  logout() {
    this.loginState = false
  }
  // 获取登录状态
  getAuthState(): boolean {
    return this.loginState
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // 分割出params，不然会报错
    const redirectUrl: string = state.url.split('?')[0]
    // 保存进入前的路由
    this.authService.redirectUrl = redirectUrl
    console.log('进入前的路由: ', redirectUrl);

    if (this.authService.getAuthState()) {
      return true
    } else {
      this.router.navigate(['/sub/login'])
      return false
    }
  }
}
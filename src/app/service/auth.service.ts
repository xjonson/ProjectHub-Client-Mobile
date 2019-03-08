import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginState = false

  constructor(
    private http: HttpClient
  ) { }

  // 登录
  login(loginForm: Partial<User>) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/users').subscribe(
        (users: User[]) => {
          users.forEach((user: User) => {
            if (loginForm.email === user.email && loginForm.password === user.password) {
              // 登录成功
              this.loginState = true
              resolve()
            } else {
              reject('账户密码错误')
            }
          });
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
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.getAuthState()) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}
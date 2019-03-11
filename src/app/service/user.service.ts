import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  // 用户注册
  register(user: Partial<User>) {
    return this.http.post('/api/users', user)
  }
}

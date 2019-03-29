import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResTpl } from '../models/ResTpl';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(
    private http: HttpClient,
    private userSrv: UserService,
    public snackBar: MatSnackBar,
  ) { }


  // 获取用户消息
  getMsgs(): Observable<any> {
    return this.http.get('api/msg').pipe(
      tap((res: ResTpl) => {
        this.snackBar.open(res.msg);
      })
    )
  }

  // 推送消息
  sendMsg(data): Observable<any> {
    return this.http.post('api/msg', data).pipe(
      tap((res: ResTpl) => {
        this.snackBar.open(res.msg);
      })
    )
  }
}

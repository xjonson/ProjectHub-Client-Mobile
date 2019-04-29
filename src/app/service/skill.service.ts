import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ResTpl } from '../models/ResTpl';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  skills: [{
    id: string,
    name: string
  }]
  constructor(
    private http: HttpClient
  ) { }

  getSkills() {
    return this.http.get('/api/skill').pipe(
      tap((resTpl: ResTpl) => {
        if (resTpl.code === 0) {
          this.skills = resTpl.data
        }
      })
    )
  }
}

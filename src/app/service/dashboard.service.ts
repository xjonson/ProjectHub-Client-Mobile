import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
  ) { }

  get() {
    return this.http.get('/api/dashboard')
  }

  update(data) {
    return this.http.patch('/api/dashboard', data)
  }
}

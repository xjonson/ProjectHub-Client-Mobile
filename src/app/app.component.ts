import { Component } from '@angular/core';
import { DashboardService } from './service/dashboard.service';

interface Dashboard {
  user: DashboardDate[],
  page: DashboardDate[],
  project: DashboardDate[],
}
interface DashboardDate {
  date: string,
  value: number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private dashboardSrv: DashboardService,
  ) { }

  ngOnInit(): void {
    // this.pageViewCount()

  }
  pageViewCount() {
    this.dashboardSrv.get().subscribe(
      (res: Dashboard) => {
        const date1 = new Date()
        const today = this.formatDate(date1)
        const todayPage = res.page.find(item => item.date === today)
        // page
        if (todayPage) {
          todayPage.value++
        } else {
          res.page = [
            ...res.page,
            {
              date: today,
              value: 1
            }
          ]
        }
        this.dashboardSrv.update(res).subscribe()
      }
    )
  }
  formatDate(str: string | Date) {
    if (!(str instanceof Date)) {
      str = new Date(str)
    }
    return `${str.getFullYear()}-${str.getMonth() + 1}-${str.getDate()}`
  }
}

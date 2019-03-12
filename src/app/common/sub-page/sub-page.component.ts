import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-page',
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.scss']
})
export class SubPageComponent implements OnInit {
  subTitle: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  // 检测
  ngDoCheck() {
    const snapshot = this.route.snapshot
    // 如果非动态的直接从路由data中获取，如果是动态的则根据传参获取
    this.subTitle = snapshot.firstChild.data.title || snapshot.queryParams['title']
  }

  // 返回上一页
  back() {
    history.back()
  }

}

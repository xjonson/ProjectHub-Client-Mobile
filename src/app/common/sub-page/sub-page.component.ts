import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-sub-page',
  templateUrl: './sub-page.component.html',
  styleUrls: ['../home-page/home-page.component.scss', './sub-page.component.scss']
})
export class SubPageComponent implements OnInit {
  subTitle: string;
  menuBtns = [
    'btn1',
    'btn2',
    'btn3'
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  // 检测
  ngDoCheck() {
    const routerTitle = this.route.snapshot.firstChild.data.title
    if (routerTitle) {
      this.subTitle = routerTitle
    } else {
      // 订阅 getTitle()，当进入页面获取到project详情时即可获得title
      this.projectService.getTitle().subscribe((title: string) => {
        // console.log('title: ', title);
        this.subTitle = title
      })
    }
    // 在这里获取路由传的值，是因为假设用户未登录前进入详情页，如果写在 ngOnInit 中，则只在页面加载时触发 1 次，当用户登录后重定向到详情页，就获取不到路由参数了。但是 ngDoCheck 可以在每次值发送变化时触发，这样依然可以获取到值。
  }

  // 返回上一页
  back() {
    history.back()
  }

}

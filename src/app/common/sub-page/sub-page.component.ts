import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { ProjectService } from 'src/app/service/project.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-sub-page',
  templateUrl: './sub-page.component.html',
  styleUrls: ['../home-page/home-page.component.scss', './sub-page.component.scss']
})
export class SubPageComponent implements OnInit, AfterViewChecked {
  subTitle: string;
  menuBtns = [
    'btn1',
    'btn2',
    'btn3'
  ];

  @ViewChild('scrollWrap') private scrollContainer: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectSrv: ProjectService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() { }


  ngAfterViewChecked() {
    this.handleScroll();
  }

  // 检测
  ngDoCheck() {
    const routerTitle = this.route.snapshot.firstChild.data.title
    if (routerTitle) {
      this.subTitle = routerTitle
    } else {
      // 订阅 getTitle()，当进入页面获取到project详情时即可获得title
      this.projectSrv.getTitle().subscribe((title: string) => {
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
  
  // 滚动
  handleScroll() {
    const eleId = this.route.snapshot.queryParams.project_msg_id
    const target = this.elementRef.nativeElement.querySelector(`#${eleId}`)
    
    if (target) {
      const top = target && target.offsetTop
      try {
        this.scrollContainer.nativeElement.scrollTo({
          top: top - (window.innerHeight - 47), // 减去像素，正好滚动到评论栏上面
          behavior: "smooth"
        })
      } catch (err) {
        console.log('err: ', err);
      }
    }
  }
}

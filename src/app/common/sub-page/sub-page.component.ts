import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { ProjectService } from 'src/app/service/project.service';
import { ViewportScroller } from '@angular/common';
import { switchMap, map } from 'rxjs/operators';

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

  ngOnInit() {
    // this.handleScroll();
  }


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
        this.subTitle = title
      })
    }
  }

  // 返回上一页
  back() {
    history.back()
  }

  // 处理滚动
  handleScroll() {
    this.route.queryParams.pipe(
      map(val => {
        return val.project_comment_id
      })
    ).subscribe(
      eleId => {
        const target = this.elementRef.nativeElement.querySelector(`#id-${eleId}`)
        if (target) {
          const top = target && target.offsetTop
          try {
            this.scrollContainer.nativeElement.scrollTo({
              top: top - (window.innerHeight - 142), // 减去像素，正好滚动到评论栏上面
              behavior: "smooth"
            })
          } catch (err) {
            console.log('err: ', err);
          }
        }
      }
    )
  }
}

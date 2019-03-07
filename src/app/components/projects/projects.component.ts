import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects = [
    {
      avatar: 'http://ww1.sinaimg.cn/large/006djfE8ly1g0t8rraqgvj30jw0jm76g.jpg',
      title: '小程序开发',
      desc: '开发者接受需求开发者接开发者接受需求开发者接受需求开发者接受需求受需求开发者接受需求开发者接开发者接受需求开发者接受需求开发者接受需求受需求开发者接受需求开发者接开发者接受需求开发者接受需求开发者接受需求受需求开发者接受需求开发者接开发者接受需求开发者接受需求开发者接受需求受需求',
      create_time: '2019-03-07 17:03:22',
      deadline: '2019-04-07 08:00:00',
      price: 800,
      status: 0,
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}

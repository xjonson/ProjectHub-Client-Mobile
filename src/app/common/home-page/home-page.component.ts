import { Component, OnInit } from '@angular/core';
import { MsgService } from 'src/app/service/msg.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    public msgSrv: MsgService,
  ) { }

  ngOnInit() {
    
  }
}

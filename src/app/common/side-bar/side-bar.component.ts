import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  opened = false;

  constructor() { }

  ngOnInit() {
  }

  toggle(): void {
    this.opened = !this.opened
  }
}

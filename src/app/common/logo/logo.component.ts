import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-logo',
  template: `
    <div>
      <img src="../../../assets/image/logo.png">
    </div>
  `,
  styles: [
    `
    div{
      text-align: center;
    }
    img {
      width: 80%;
      background: #424242;
      border-radius: 6px;
    }`
  ]
})
export class LogoComponent implements OnInit {
  @Input() size: number
  @Input() color: string


  constructor() { }

  ngOnInit() {}

  getStyle() {
    return {
      'width': `${(this.size || 32)}px`,
      'height': `${(this.size || 32)}px`,
      'fill': this.color
    }
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wechat-program',
  templateUrl: './wechat-program.component.html',
  styleUrls: ['./wechat-program.component.scss']
})
export class WechatProgramComponent implements OnInit {
  public storeInfo: object = {};
  constructor(
  ) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { WechatProgramService } from './wechat-program.service';

@Component({
  selector: 'app-wechat-program',
  templateUrl: './wechat-program.component.html',
  styleUrls: ['./wechat-program.component.scss']
})
export class WechatProgramComponent implements OnInit {

  constructor(
    private storeInfo: WechatProgramService
  ) { }

  ngOnInit() {
  }

}

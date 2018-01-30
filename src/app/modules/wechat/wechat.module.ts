import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WechatProgramComponent } from './wechat-program/wechat-program.component';
import { WechatRoutingModule } from './wechat-routing';
import { StoreInfoComponent } from './wechat-program/store-info/store-info.component';
import { StoreActivityComponent } from './wechat-program/store-activity/store-activity.component';
import { StoreEffectComponent } from './wechat-program/store-effect/store-effect.component';
import { WechatProgramService } from './wechat-program/wechat-program.service';

@NgModule({
  imports: [
    CommonModule,
    WechatRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [ WechatProgramComponent, StoreInfoComponent, StoreActivityComponent, StoreEffectComponent ],
  providers: [ WechatProgramService ]
})
export class WechatModule { }

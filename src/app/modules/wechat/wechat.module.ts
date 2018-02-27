import { CityAddressService } from './../../services/global-data/city-address.service';
import { HttpService } from './../../services/http/http.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WechatProgramComponent } from './wechat-program/wechat-program.component';
import { WechatRoutingModule } from './wechat-routing';
import { StoreInfoComponent } from './wechat-program/store-info/store-info.component';
import { StoreActivityComponent } from './wechat-program/store-activity/store-activity.component';
import { StoreEffectComponent } from './wechat-program/store-effect/store-effect.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './../../services/http/http.intercept';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    WechatRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [ WechatProgramComponent, StoreInfoComponent, StoreActivityComponent, StoreEffectComponent ],
  providers: [
    HttpService,
    CityAddressService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true,
    }
  ]
})
export class WechatModule { }

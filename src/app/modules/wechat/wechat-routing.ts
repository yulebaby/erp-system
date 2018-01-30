import { WechatProgramComponent } from './wechat-program/wechat-program.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: 'wechat-program',
        data: { title: '微信小程序' },
        component: WechatProgramComponent
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class WechatRoutingModule {}
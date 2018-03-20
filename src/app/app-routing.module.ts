import { IndexComponent } from './base/index/index.component';
import { LoginComponent } from './base/login/login.component';
import { BaseComponent } from './base/base.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: BaseComponent,
    children: [
      {
        path: '',
        data: { title: '首页' },
        component: IndexComponent
      },
      {
        path: 'wechat',
        data: { title: '微信' },
        loadChildren: 'app/modules/wechat/wechat.module#WechatModule'
      },
      {
        path: 'customer',
        data: { title: '客户管理' },
        loadChildren: 'app/modules/customer/customer.module#CustomerModule'
      }
    ]
  },
  {
    path: 'system',
    data: { title: '系统管理' },
    loadChildren: 'app/modules/system/system.module#SystemModule'
  },
  {
    path: '**',
    redirectTo: '/system/error/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

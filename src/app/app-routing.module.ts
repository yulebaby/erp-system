import { IndexComponent } from './base/index/index.component';
import { ErrorComponent } from './base/error/error.component';
import { BaseComponent } from './frames/base.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: 'app/modules/user/user.module#UserModule'
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
        path: 'test',
        data: { title: '测试模块' },
        loadChildren: 'app/modules/test/test.module#TestModule'
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
    path: 'error/:type',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '/error/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

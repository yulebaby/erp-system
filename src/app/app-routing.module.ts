import { ErrorComponent } from './base/error/error.component';
import { BaseComponent } from './frames/base.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './base/login/login.component';

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
        path: 'test',
        data: {title: '测试模块'},
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
    path: 'login',
    data: { title: '登录' },
    component: LoginComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '/error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

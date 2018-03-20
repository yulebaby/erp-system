import { AppRouterService } from './app-router.service';
import { UserService } from './base/login/user.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { HttpService } from './relax/services/http/http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  
  constructor( 
    private router       : Router,
    private http         : HttpService,
    private notification : NzNotificationService,
    private user         : UserService,
    private baseRouter   : AppRouterService
  ) { 
    /* ----------------------- 监听路由变化, 获取未登录来源页 ----------------------- */
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.baseRouter.goPath = event.url;
        if (event.url.indexOf('/login') === -1) {
          this.baseRouter.loginSource = event.url;
        }
      }

      if (event instanceof NavigationEnd) {
        this.baseRouter.toPath = event.url;
      }
    });

    user.getUser();
    this._getRkInfo();
  }

  _getRkInfo(): void {
    setInterval(_ => {
      this._showHomePage();
    }, 10 * 60 * 1000);
    setTimeout(() => {
      this._showHomePage();
    }, 3000);
  }

  _showHomePage(): void {
    if (this.baseRouter.toPath.indexOf('/login') === -1) {
      this.http.post('/customer/statisticsMemberTotalForHour').then( res => {
        try {
          if (res.code == 1000 && res.result.list.length) {
            let notifInfo = `又有 ${res.result.list.length} 条潜在客户入库啦，快去跟进吧~`;
            notifInfo = res.result.status == 1 ? `刚刚${notifInfo}` : `昨天${notifInfo}`;
            this.notification.info('潜在客户入库提醒：', notifInfo);
          }
        } catch (e) { }
      })
    }
  }
  
}

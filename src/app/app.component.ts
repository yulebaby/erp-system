import { NzNotificationService } from 'ng-zorro-antd';
import { LoginService } from './modules/user/login/login.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { HttpService } from './relax/services/http/http.service';
import { Component } from '@angular/core';
import { UserService } from './modules/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor( 
    private router       : Router,
    private login        : LoginService,
    private http         : HttpService,
    private notification : NzNotificationService,
    private user         : UserService
  ) { 
    /* ----------------------- 监听路由变化, 获取未登录来源页 ----------------------- */
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.login.loginToPath = event.url;
        if (event.url.indexOf('/user/login') === -1) {
          this.login.loginSource = event.url;
        }
      }

      if (event instanceof NavigationEnd) {
        this.loginEnd = event.url.indexOf('/user/login') > -1;
        if (!this.carried && !this.loginEnd) {
          this._getRkInfo();
          this.carried = true;
        }
      }
    });

    user.getUser();
  }

  _getRkInfo(): void {
    setInterval(_ => {
      this._showHomePage();
    }, 10 * 60 * 1000);
    setTimeout(() => {
      this._showHomePage();
    }, 1000);
  }

  private loginEnd: boolean;
  private carried : boolean;
  _showHomePage(): void {
    if (!this.loginEnd) {
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

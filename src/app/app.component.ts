import { NzNotificationService } from 'ng-zorro-antd';
import { LoginService } from './base/login/login.service';
import { Router, NavigationStart } from '@angular/router';
import { HttpService } from './relax/services/http/http.service';
import { Component } from '@angular/core';

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
    private notification : NzNotificationService
  ) { 
    /* ----------------------- 监听路由变化, 获取未登录来源页 ----------------------- */
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.login.loginToPath = event.url;
        if (event.url.indexOf('/login') === -1) {
          this.login.loginSource = event.url;
        }
      }
    });

    setInterval( _ => {
      this._showHomePage();
    }, 10 * 60 * 1000)

    setTimeout(() => {
      this._showHomePage();
    }, 1000);
  }

  _showHomePage(): void {
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

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
    private router: Router,
    private login: LoginService
  ) { 
    /* ----------------------- 监听路由变化, 获取未登录来源页 ----------------------- */
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url.indexOf('/login') === -1) {
          this.login.loginSource = event.url;
        }
      }
    })
  }
}

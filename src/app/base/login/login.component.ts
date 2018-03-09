import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { HttpService } from './../../relax/services/http/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpService,
    private login: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.get('/auth/login?username=t__bby&password=q123456').then( res => {
      if (res.code == 1000) {
        // this.router.navigateByUrl(this.login.loginSource || '/home')
      }
    })
    console.log(this.login.loginSource);
  }

}

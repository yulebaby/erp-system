import { HttpService } from './../../relax/services/http/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.http.post('http://192.168.1.148:8383/auth/login?username=t__bby&password=q123456')
  }

}

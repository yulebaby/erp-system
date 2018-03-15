import { LoginService } from './../../../relax/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from './../../../relax/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
declare const CryptoJS;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm    : FormGroup;

  loginLoading : boolean;

  loginError   : string = '';

  constructor(
    private http    : HttpService,
    private login   : LoginService,
    private router  : Router,
    private fb      : FormBuilder = new FormBuilder(),
    private user    : UserService
  ) { }

  ngOnInit() {
    /* ------------------- 判断本地是否存储用户名密码 ------------------- */
    try {
      let userName = window.localStorage.getItem('username') ? JSON.parse(window.localStorage.getItem('username')) : {};
      this._loginFormInit(userName);
    } catch (e) {
      this._loginFormInit();
    } 

  }


  /* ------------------------- 初始化模型表单 ------------------------- */
  _loginFormInit(obj: object = {}): void {
    this.loginForm = this.fb.group({
      username: [obj['username'] || '', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      password: [obj['password'] || '', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      remember: [true]
    });
    this.loginForm.valueChanges.subscribe(res => {
      this.loginError = '';
    })
  }


  /* ----------------------------- 登录 ----------------------------- */
  _submit() {
    for (let i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
    }

    if (this.loginForm.valid && !this.loginLoading) {
      this.loginLoading = true;

      /* ------------------ AES加密密码 ------------------ */
      let params = JSON.parse(JSON.stringify(this.loginForm.value));
      params.password = this._encrypt(params.password);
      this.http.post('/auth/login', params).then(res => {
        this.loginLoading = false;
        if (res.code == 1000) {
          this.user.setUser(res.result);
          /* ------------------ 存储用户名密码 ------------------ */
          if (params.remember) {
            window.localStorage.setItem('username', JSON.stringify(this.loginForm.value));
          }
          this.router.navigateByUrl(this.login.loginSource || '/home');
        } else {
          this.loginError = res.info;
        }
      }, err => {
        this.loginLoading = false;
      })
    }
  }

  /* ------------------------ AES加密 ------------------------ */
  private key = 'yulebaby88888888'
  _encrypt(str: string): string {
    var key = CryptoJS.enc.Utf8.parse(this.key);
    var srcs = CryptoJS.enc.Utf8.parse(str);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
  }

}

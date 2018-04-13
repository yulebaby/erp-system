import { AppUserService } from './../../app-user.service';
import { AppRouterService } from './../../app-router.service';
import { HttpService } from './../../relax/services/http/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
    private http       : HttpService,
    private baseRouter : AppRouterService,
    private router     : Router,
    private fb         : FormBuilder = new FormBuilder(),
    private user       : AppUserService,
    private activated  : ActivatedRoute
  ) { }

  ngOnInit() {
    /* ------------------- 判断本地是否存储用户名密码 ------------------- */
    try {
      let userName = window.localStorage.getItem('username') ? JSON.parse(window.localStorage.getItem('username')) : {};
      this._loginFormInit(userName);
    } catch (e) {
      this._loginFormInit();
    } 

    this.activated.queryParamMap.subscribe( (query: any) => {
      if (query.params.authCode){
        this._login(query.params.authCode);
      }
    });

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

    if (this.loginForm.valid) {
      this._login();
    }
  }
  private _login(authCode?: string | boolean): void {
    if (this.loginLoading) { return; }
    this.loginLoading = true;
    /* --------- 根据authCode是否存在,判断是否为免密登录 --------- */
    let params;
    if (authCode) {
      params = { authCode: authCode };
    } else {
      params = JSON.parse(JSON.stringify(this.loginForm.value));
      params.password = this._encrypt(params.password);
    }
    this.http.post('/auth/login', params).then(res => {
      this.loginLoading = false;
      if (res.code == 1000) {
        this.user.setUser(res.result);
        /* ------------------ 存储用户名密码 ------------------ */
        if (params.remember && !authCode) {
          window.localStorage.setItem('username', JSON.stringify(this.loginForm.value));
        }
        this.router.navigateByUrl(this.baseRouter.loginSource || '/home');
      } else {
        this.loginError = res.info;
      }
    }, err => {
      this.loginLoading = false;
    })
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

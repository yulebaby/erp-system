import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { HttpService } from './../../../relax/services/http/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private http    : HttpService,
    private login   : LoginService,
    private router  : Router,
    private fb      : FormBuilder = new FormBuilder()
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      remember: [true]
    });
  }

  _submit() {
    for (let i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
    }

    if (this.loginForm.valid) {
      this.http.get('/auth/login?username=t__bby&password=q123456').then(res => {
        if (res.code == 1000) {
          this.router.navigateByUrl(this.login.loginSource || '/home')
        }
      })
    }
  }

}

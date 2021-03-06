import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../../../environments/environment";
import 'rxjs/add/operator/retry';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class HttpService {

  constructor(
    private http    : HttpClient,
    private router  : Router,
    private message : NzMessageService
  ) { }

  /*
  *  post/get 请求方法:
  *    接收参数
  *            1. 请求地址: string    (必填)
  *            2. 请求参数: object    (必填: 可为空)
  */
  post(url: string, query: object = {}): Promise<any> {
    const requestPath = url.substr(0, 4) === 'http' ? url : environment.domain + url;
    return new Promise((resolve, reject) => {
      this.http.post(requestPath, query)
        .retry(1)
        .subscribe(
          res => {
            if (res['code'] == 3000) {
              this.router.navigateByUrl('/login');
            } else {
              resolve(res);
            }
          },
          err => {
            this.message.error('网络错误，请刷新重试！！！')
            reject(err);
          }
        )
    })
  }

  get(url: string, query: object = {}): Promise<any> {
    const requestPath = url.substr(0, 4) === 'http' ? url : environment.domain + url;
    return new Promise((resolve, reject) => {
      this.http.get(requestPath, { params: new HttpParams({ fromString: serialize(query) }) })
        .retry(1)
        .subscribe(
          res => {
            if (res['code'] == 3000) {
              this.router.navigateByUrl('/login');
            } else {
              resolve(res);
            }
          },
          err => {
            this.message.error('网络错误，请刷新重试！！！')
            reject(err);
          }
        )
    })
  }

}

/* 序列化请求参数 */
export const serialize = (data: object): string => {
  let val = '';
  for (let v in data) {
    if (data[v] !== '' && data[v] !== null && data[v] !== undefined) {
      val += `${v}=${data[v]}&`;
    }
  }
  return val.slice(0, val.length - 1);
}
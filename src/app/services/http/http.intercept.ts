import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { serialize } from './http.service';

/**
 * @class 拦截请求与响应
 * @description 添加请求token 及 错误处理
 */

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    const Token = 'token';
    if (req.method === 'POST') {
      req.body.token = Token;
      req = req.clone({
        body: serialize(req.body),
        setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      })
    } else if (req.method === 'GET') {
      req = req.clone({
        params: req.params.set('token', Token)
      })
    }
    return next.handle(req).map(res => {
      if (res instanceof HttpResponse) {
        console.log(res)
        if (res.status !== 200 && res.status !== 304) {

        }
      }
      return res;
    });
  }

  constructor( ) { }

}

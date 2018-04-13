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
    if (req.method === 'POST') {
      req = req.clone({
        body: serialize(req.body),
        withCredentials: true,
        setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      })
    } else if (req.method === 'GET') {
      // req = req.clone({
      //   withCredentials: true
      // })
    }
    return next.handle(req).map(res => {
      if (res instanceof HttpResponse) {
        if (res.status !== 200 && res.status !== 304) {

        }
      }
      return res;
    });
  }

  constructor( ) { }

}

import { Injectable } from '@angular/core';

@Injectable()
export class AppRouterService {

  /* -------- 登录来源 -------- */
  loginSource: string;

  /* -------- 去往路径 -------- */
  goPath     : string;

  /* -------- 到达路径 -------- */
  toPath     : string;

  constructor() { }

}

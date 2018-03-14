import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  userInfo: UserInfo;

  /* --------------- 来源路径 --------------- */
  loginSource: string;

  loginToPath: string;

  constructor() { }

}

/**
 * @interface 用户登录Result
 */
interface UserInfo {
  name    : string;
  roles   : Array<any>;
  store   : Array<any>;
}

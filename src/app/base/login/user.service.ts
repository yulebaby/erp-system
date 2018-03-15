import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    userInfo: UserInfo;

    constructor( 
        private router: Router
    ) { }

    /* --------------------- 存储用户信息 --------------------- */
    setUser(info: UserInfo): void {
        this.userInfo = info;
        window.localStorage.setItem('userInfo', JSON.stringify(info));
    }

    /* --------------------- 获取用户信息 --------------------- */
    getUser(): void {
        try {
            let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
            if (!userInfo.id) throw "未登录";
                this.userInfo = userInfo;
        } catch (e) {
            this.router.navigateByUrl('/login');
        }
    }
    signOut(): void {
        window.localStorage.removeItem('userInfo');
        this.router.navigateByUrl('/login');
    }
}

interface UserInfo {
    name    : string;
    email?  : string;
    id      : number;
    roles   : any[];
    status  : number;
    store   : object
}
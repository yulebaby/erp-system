import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    userInfo: UserInfo;

    constructor( ) { }
}

interface UserInfo {
    name    : string;
    email?  : string;
    id      : number;
    roles   : any[];
    status  : number;
    store   : object
}
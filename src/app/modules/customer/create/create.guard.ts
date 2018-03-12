import { LoginService } from './../../../base/login/login.service';
import { Observable } from 'rxjs/Rx';
import { CreateCustomerComponent } from './create.component';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
@Injectable()
export class CreateCanDeactivate implements CanDeactivate<CreateCustomerComponent> {
    constructor(
        private confirm: NzModalService,
        private login: LoginService
    ) {}

    canDeactivate(
        component: CreateCustomerComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> | boolean | Observable<boolean> {
        if (this.login.loginToPath.indexOf('/login') > -1 || component._submitLoading) { return true; }
        return new Observable( (observer) => {
            this.confirm.confirm({
                title: '确认离开此页面吗?',
                content: '<b>您还未保存信息</b>',
                okText: '离开',
                cancelText: '取消',
                onOk() {
                    observer.next(true);
                    observer.complete()
                },
                onCancel() {
                    observer.next(false);
                    observer.complete()
                }
            });
        })
    }
}
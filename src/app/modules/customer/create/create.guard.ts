import { Observable } from 'rxjs/Rx';
import { CreateCustomerComponent } from './create.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
@Injectable()
export class CreateCanDeactivate implements CanDeactivate<CreateCustomerComponent> {
    constructor(
        private confirm: NzModalService
    ) {}

    canDeactivate(
        component: CreateCustomerComponent
    ): Promise<boolean> | boolean | Observable<boolean> {
        console.log(component)
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
import { StatisticsComponent } from './statistics/statistics.component';
import { CreateComponent } from './create/create.component';
import { AdminComponent } from './admin/admin.component';
import { DataComponent } from './data/data.component';
import { ActivityComponent } from './activity/activity.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: 'activity',
        data: { title: '活动' },
        component: ActivityComponent
    },
    {
        path: 'data',
        data: { title: '数据' },
        children: [
            {
                path: '',
                data: { titleHide: true },
                component: DataComponent
            },
            {
                path: 'statistics/:id',
                data: { title: '数据统计' },
                component: StatisticsComponent
            }
        ]
    },
    {
        path: 'admin',
        data: { title: '管理' },
        component: AdminComponent,
        children: [
            {
                path: 'create/:id',
                data: { title: '新建活动' },
                component: CreateComponent,
                outlet: 'aux'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MarketingRoutingModule { }
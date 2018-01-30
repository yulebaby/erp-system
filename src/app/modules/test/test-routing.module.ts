import { TestlistComponent } from './testlist/testlist.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestdetailsComponent } from './testdetails/testdetails.component';
const routes: Routes = [
    {
        path: 'testlist',
        data: { title: '测试列表' },
        component: TestlistComponent
    },
    {
        path: 'testdetails',
        data: { title: '测试详情' },
        component: TestdetailsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
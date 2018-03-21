import { MarketingRoutingModule } from './marketing-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { DataComponent } from './data/data.component';
import { AdminComponent } from './admin/admin.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    MarketingRoutingModule
  ],
  declarations: [ActivityComponent, DataComponent, AdminComponent]
})
export class MarketingModule { }

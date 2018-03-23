import { RelaxModule } from './../../relax/relax.module';
import { MarketingRoutingModule } from './marketing-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { DataComponent } from './data/data.component';
import { AdminComponent } from './admin/admin.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    MarketingRoutingModule,
    RelaxModule
  ],
  declarations: [ActivityComponent, DataComponent, AdminComponent]
})
export class MarketingModule { }

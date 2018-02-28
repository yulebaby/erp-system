import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCustomerComponent } from './all/all.component';
import { UnassignedComponent } from './unassigned/unassigned.component';
import { AllocatedComponent } from './allocated/allocated.component';
import { TrackingRecordComponent } from './tracking-record/tracking-record.component';
import { PublicSeaPoolComponent } from './public-sea-pool/public-sea-pool.component';
import { CustomerRoutingModule } from './customer-routing';
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';
import { DistributionComponent } from './distribution/distribution.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [
    AllCustomerComponent, 
    UnassignedComponent, 
    AllocatedComponent, 
    TrackingRecordComponent, 
    PublicSeaPoolComponent, 
    RecycleBinComponent, 
    DistributionComponent
  ]
})
export class CustomerModule { }

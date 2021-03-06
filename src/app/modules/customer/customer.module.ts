import { PreviewCustomerComponent } from './preview/preview.component';
import { CreateCustomerComponent } from './create/create.component';
import { RelaxModule } from './../../relax/relax.module';
import { CreateCanDeactivate } from './create/create.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AllCustomerComponent } from './all/all.component';
import { UnassignedComponent } from './unassigned/unassigned.component';
import { AllocatedComponent } from './allocated/allocated.component';
import { TrackingRecordComponent } from './tracking-record/tracking-record.component';
import { PublicSeaPoolComponent } from './public-sea-pool/public-sea-pool.component';
import { CustomerRoutingModule } from './customer-routing';
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';
import { DistributionComponent } from './distribution/distribution.component';
import { NointentionComponent } from './nointention/nointention.component';
import { MonthdiffPipe } from './pipes/monthdiff.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    NgZorroAntdModule,
    RelaxModule
  ],
  declarations: [
    AllCustomerComponent, 
    UnassignedComponent, 
    AllocatedComponent, 
    TrackingRecordComponent, 
    PublicSeaPoolComponent, 
    RecycleBinComponent, 
    DistributionComponent, CreateCustomerComponent, PreviewCustomerComponent, NointentionComponent, MonthdiffPipe
  ],
  providers: [
    DatePipe,
    MonthdiffPipe,
    CreateCanDeactivate
  ]
})
export class CustomerModule { }

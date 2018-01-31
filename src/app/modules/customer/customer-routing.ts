import { TrackingRecordComponent } from './tracking-record/tracking-record.component';
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';
import { PublicSeaPoolComponent } from './public-sea-pool/public-sea-pool.component';
import { AllCustomerComponent } from './all/all.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UnassignedComponent } from './unassigned/unassigned.component';
import { AllocatedComponent } from './allocated/allocated.component';
import { DistributionComponent } from './distribution/distribution.component';

const routes: Routes = [
	{
		path: 'all',
		data: { title: '全部客户' },
		component: AllCustomerComponent
	},
	{
		path: 'unassigned',
		data: { title: '待分配客户' },
		component: UnassignedComponent
	},
	{
		path: 'allocated',
		data: { title: '已分配客户' },
		component: AllocatedComponent
	},
	{
		path: 'tracking-record',
		data: { title: '跟踪记录' },
		component: TrackingRecordComponent
	},
	{
		path: 'public-sea-pool',
		data: { title: '公海池' },
		component: PublicSeaPoolComponent
	},
	{
		path: 'recycle-bin',
		data: { title: '回收站' },
		component: RecycleBinComponent
	},
	{
		path: 'distribution',
		data: { title: '分配设置'},
		component: DistributionComponent
	}
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class CustomerRoutingModule {}
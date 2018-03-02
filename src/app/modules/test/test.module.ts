import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestlistComponent } from './testlist/testlist.component';
import { TestdetailsComponent } from './testdetails/testdetails.component';
import { TestRoutingModule } from './test-routing.module';
import { RelaxModule } from '../../relax/relax.module';

@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    RelaxModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  declarations: [TestlistComponent, TestdetailsComponent]
})
export class TestModule { }

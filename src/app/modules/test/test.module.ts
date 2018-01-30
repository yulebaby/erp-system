import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestlistComponent } from './testlist/testlist.component';
import { TestdetailsComponent } from './testdetails/testdetails.component';
import { TestRoutingModule } from './test-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule
  ],
  declarations: [TestlistComponent, TestdetailsComponent]
})
export class TestModule { }

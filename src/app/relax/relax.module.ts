import { HttpService } from './services/http/http.service';
import { CmAlertComponent } from './components/cm-alert/cm-alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmQueryComponent } from './components/cm-query/cm-query.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CmAlertComponent,
    CmQueryComponent
  ],
  providers: [
    HttpService
  ],
  exports: [
    CmAlertComponent,
    CmQueryComponent
  ]
})
export class RelaxModule { }

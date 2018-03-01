import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpService } from './services/http/http.service';
import { CmAlertComponent } from './components/cm-alert/cm-alert.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CmQueryComponent } from './components/cm-query/cm-query.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  declarations: [
    CmAlertComponent,
    CmQueryComponent
  ],
  providers: [
    HttpService,
    DatePipe
  ],
  exports: [
    CmAlertComponent,
    CmQueryComponent
  ]
})
export class RelaxModule { }

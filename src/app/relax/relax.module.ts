import { HttpService } from './services/http/http.service';
import { CmAlertComponent } from './components/cm-alert/cm-alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CmAlertComponent
  ],
  providers: [
    HttpService
  ],
  exports: [
    CmAlertComponent
  ]
})
export class RelaxModule { }

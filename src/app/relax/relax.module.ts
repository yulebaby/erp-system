import { CacheService } from './services/cache/cache.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpService } from './services/http/http.service';
import { CmAlertComponent } from './components/cm-alert/cm-alert.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CmQueryComponent } from './components/cm-query/cm-query.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmTableComponent } from './components/cm-table/cm-table.component';
import { CmQuoteComponent } from './components/cm-quote/cm-quote.component';
import { CmGettelComponent } from './components/cm-gettel/cm-gettel.component';
import { CmSlideComponent } from './components/cm-slide/cm-slide.component';
import { CmTitleComponent } from './components/cm-title/cm-title.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  declarations: [
    CmAlertComponent,
    CmQueryComponent,
    CmTableComponent,
    CmQuoteComponent,
    CmGettelComponent,
    CmSlideComponent,
    CmTitleComponent
  ],
  providers: [
    HttpService,
    CacheService,
    DatePipe
  ],
  exports: [
    CmAlertComponent,
    CmQueryComponent,
    CmTableComponent,
    CmQuoteComponent,
    CmGettelComponent,
    CmSlideComponent,
    CmTitleComponent
  ]
})
export class RelaxModule { }

import { IndexComponent } from './../base/index/index.component';
import { AppUserService } from './app-user.service';
import { AppRouterService } from './app-router.service';
import { LoginComponent } from './../base/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './../relax/services/http/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';

import { NgZorroAntdModule, NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './../base/header/header.component';
import { MenuComponent } from './../base/menu/menu.component';
import { ContentComponent } from './../base/content/content.component';
import { FooterComponent } from './../base/footer/footer.component';
import { BreadcrumbComponent } from './../base/content/breadcrumb/breadcrumb.component';
import { BaseComponent } from './../base/base.component';
import { NoopInterceptor } from './../relax/services/http/http.intercept';
import { ViserModule } from 'viser-ng';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    BreadcrumbComponent,
    BaseComponent,
    IndexComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    ViserModule
  ],
  providers: [
    AppRouterService,
    AppUserService,
    HttpService,
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true,
    },
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000, nzMaxStack: 1 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

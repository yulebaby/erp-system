import { HttpService } from './relax/services/http/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './frames/header/header.component';
import { MenuComponent } from './frames/menu/menu.component';
import { ContentComponent } from './frames/content/content.component';
import { FooterComponent } from './frames/footer/footer.component';
import { ErrorComponent } from './base/error/error.component';
import { WelcomeComponent } from './frames/content/welcome/welcome.component';
import { LoginComponent } from './base/login/login.component';
import { BreadcrumbComponent } from './frames/content/breadcrumb/breadcrumb.component';
import { BaseComponent } from './frames/base.component';
import { NoopInterceptor } from './relax/services/http/http.intercept';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    ErrorComponent,
    WelcomeComponent,
    LoginComponent,
    BreadcrumbComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    HttpService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true,
    }
  ]
})
export class AppModule { }

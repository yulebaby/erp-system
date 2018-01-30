import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

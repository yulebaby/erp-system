import { LoginService } from './../../relax/services/login.service';
import { UserService } from './user.service';
import { HttpService } from './../../relax/services/http/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    UserRoutingModule
  ],
  providers: [
    HttpService,
    UserService
  ],
  declarations: [LoginComponent]
})
export class UserModule { }

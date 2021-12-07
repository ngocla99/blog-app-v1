import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignComponent } from './auth-components/sign/sign.component';
import { SettingComponent } from './auth-components/setting/setting.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './auth-components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent, SignComponent, SettingComponent, LoginComponent],
  imports: [BrowserModule, AuthRoutingModule, HttpClientModule, FormsModule],
  exports: [],
})
export class AuthModule {}

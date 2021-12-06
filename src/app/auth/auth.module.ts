import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignComponent } from './auth-components/sign/sign.component';
import { SettingComponent } from './auth-components/setting/setting.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AuthComponent, SignComponent, SettingComponent],
  imports: [BrowserModule, AuthRoutingModule],
  exports: [],
})
export class AuthModule {}

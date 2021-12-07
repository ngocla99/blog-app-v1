import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';

import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProfileModule,
    SharedModule,
    AuthModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

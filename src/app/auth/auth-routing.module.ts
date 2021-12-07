import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignComponent } from './auth-components/sign/sign.component';
import { SettingComponent } from './auth-components/setting/setting.component';
import { LoginComponent } from './auth-components/login/login.component';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'setting',
    component: SettingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

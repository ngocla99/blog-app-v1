import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignComponent } from './auth-components/sign/sign.component';
import { SettingComponent } from './auth-components/setting/setting.component';

const routes: Routes = [
  {
    path: 'sign',
    component: SignComponent,
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

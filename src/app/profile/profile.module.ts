import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileArticleComponent } from './profile-article/profile-article.component';

@NgModule({
  declarations: [ProfileComponent, ProfileArticleComponent],
  imports: [ProfileRoutingModule, SharedModule],
  // exports: [],
})
export class ProfileModule {}

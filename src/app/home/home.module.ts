import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TagsComponent } from './tags/tags.component';
import { GlobalComponent } from './global/global.component';
import { FeedComponent } from './feed/feed.component';
import { TestUiComponent } from './test-ui/test-ui.component';

@NgModule({
  declarations: [HomeComponent, TagsComponent, GlobalComponent, FeedComponent, TestUiComponent],
  imports: [HomeRoutingModule, SharedModule],
  exports: [],
})
export class HomeModule {}

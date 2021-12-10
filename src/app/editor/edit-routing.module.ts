import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { NewArticleComponent } from './new-article/new-article.component';

const routes: Routes = [
  {
    path: 'editor',
    component: NewArticleComponent,
    canActivate: [AuthGuard],
    // canDeactivate: [CandeactiveService],
  },
  {
    path: 'editor/:slug',
    component: EditArticleComponent,
    canActivate: [AuthGuard],
    // canDeactivate: [CandeactiveService],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditArticleRoutingModule {}

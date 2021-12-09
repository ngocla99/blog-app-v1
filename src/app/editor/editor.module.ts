import { NgModule } from '@angular/core';
import { EditorComponent } from './editor/editor.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EditArticleRoutingModule } from './edit-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditorComponent,
    NewArticleComponent,
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EditArticleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
})
export class EditorModule {}

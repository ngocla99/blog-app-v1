import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';

import { ArticleComponent } from './component/articles-list/article/article.component';
import { ArticlesListComponent } from './component/articles-list/articles-list.component';
import { ArticleDetailComponent } from './component/article-detail/article-detail.component';
import { CommentComponent } from './component/article-detail/comment/comment.component';
import { CommentItemComponent } from './component/article-detail/comment-item/comment-item.component';
import { CommentListComponent } from './component/article-detail/comment-list/comment-list.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { LoadingSpinnerComponent } from './component/loading-spinner/loading-spinner.component';
import { ArticleTagComponent } from './component/articles-list/article/article-tag/article-tag.component';
import { TruncatePipe } from './pipe/truncate.pipe';
import { PreloaderComponent } from './component/preloader/preloader.component';
import { AlertComponent } from './component/alert/alert.component';
import { WidgetAboutComponent } from './component/extension/widget-about/widget-about.component';
import { NewsletterComponent } from './component/extension/newsletter/newsletter.component';
@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleDetailComponent,
    CommentComponent,
    ArticleComponent,
    CommentItemComponent,
    CommentListComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    ArticleTagComponent,
    TruncatePipe,
    PreloaderComponent,
    AlertComponent,
    WidgetAboutComponent,
    NewsletterComponent,
  ],
  imports: [CommonModule, SharedRoutingModule],
  exports: [
    CommonModule,
    CommentComponent,
    ArticlesListComponent,
    ArticleDetailComponent,
    ArticleComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
    PreloaderComponent,
    AlertComponent,
    WidgetAboutComponent,
    NewsletterComponent,
  ],
})
export class SharedModule {}

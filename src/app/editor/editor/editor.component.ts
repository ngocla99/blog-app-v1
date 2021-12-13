import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/service/article.service';
import { CanComponentDeactivate } from 'src/app/shared/guards/can-deactivate-guard.service';
import { ArticlePost } from 'src/app/shared/model/article.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @Input() article?: any;
  errors: string[] = [];
  editFlag = false;
  title!: string;
  description!: string;
  content!: string;
  tags!: string;
  articleEditorForm!: FormGroup;

  @Output() change = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.article !== undefined) {
      this.editFlag = true;
      this.title = this.article.title;
      this.description = this.article.description;
      this.content = this.article.body;
      this.tags = this.article.tagList.join(',');
    }
    this.articleEditorForm = this.fb.group({
      title: [this.title, Validators.required],
      description: [this.description, Validators.required],
      content: [this.content, Validators.required],
      tags: [this.tags],
    });
    this.change.emit(false);

    this.articleEditorForm.valueChanges.subscribe(() => {
      this.change.emit(true);
    });
  }

  get form() {
    return this.articleEditorForm.controls;
  }

  handleForm(form: any) {
    const formValue = {
      title: form.title,
      description: form.description,
      body: form.content,
      tagList: form.tags.split(','),
    };

    if (this.editFlag) {
      this.editArticle(formValue, this.article.slug);
    } else {
      this.postArticle(formValue);
    }
  }

  postArticle(article: ArticlePost) {
    this.articleService.postNewArticle({ article: article }).subscribe(
      (data: any) => {
        this.router.navigate(['/article', data.article.slug]);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  editArticle(article: ArticlePost, articleSlug: string) {
    this.articleService
      .editArticle({ article: article }, articleSlug)
      .subscribe(
        (data) => {
          this.router.navigate(['/article', data.article.slug]);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}

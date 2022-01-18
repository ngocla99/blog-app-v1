import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/model/comment.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CommentsService } from 'src/app/shared/service/comments.service';
import { SwalService } from 'src/app/shared/service/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() slug!: any;
  comments: Comment[] = [];
  isLoading!: boolean;

  totalLength!: number;
  page: number = 1;

  slugArr: string[] = [
    'Create-a-new-implementation-1',
    'Explore-implementations-1',
    'Welcome-to-RealWorld-project-1',
  ];
  constructor(
    private commentService: CommentsService,
    private auth: AuthService,
    private swalService: SwalService
  ) {
    this.commentService.deleteEvent.subscribe((commentId) => {
      this.deleteComment(commentId);
    });
  }

  ngOnInit(): void {
    if (this.slugArr.includes(this.slug)) {
      this.getArticleComments();
    } else {
      this.getComments();
    }
  }

  getArticleComments() {
    this.isLoading = true;
    this.commentService.getArticle().subscribe(
      (data) => {
        this.isLoading = false;
        const articleBySlug = data.articles.filter((e) => e.slug == this.slug);

        if (articleBySlug.length > 0) {
          this.comments = articleBySlug[0].comments?.reverse();
        } else {
          this.comments = [];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getComments() {
    this.isLoading = true;
    this.commentService.getArticleComments(this.slug).subscribe((data) => {
      this.isLoading = false;

      if (data.comments?.length > 0) {
        this.comments = data.comments;
      } else {
        this.comments = [];
      }
    });
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  findComment(commentId: number) {
    return this.comments.map((comment) => comment.id).indexOf(commentId);
  }

  addComment(commentValue: string) {
    window.scrollTo(0, 680);
    commentValue = commentValue.trim();
    if (commentValue.length !== 0) {
      const comment = {
        body: commentValue,
      };
      this.commentService
        .postArticleComment(this.slug, { comment: comment })
        .subscribe(
          (data) => {
            this.swalService.interact('', 'Add comment success');

            this.comments.unshift(data.comment);
            (document.getElementById('InputComment') as HTMLFormElement).value =
              '';
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  deleteComment(commentId: number) {
    this.swalService.delete().then((result) => {
      if (result.isConfirmed) {
        this.commentService
          .deleteArticleComment(this.slug, commentId)
          .subscribe(
            () => {
              this.swalService.interact('', 'Delete comment successfully');

              this.comments.splice(this.findComment(commentId), 1);
            },
            (err) => {
              console.log(err);
            }
          );
        this.swalService.deleteSucceeded();
      }
    });
  }
}

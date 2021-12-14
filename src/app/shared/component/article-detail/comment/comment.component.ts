import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CommentsService } from 'src/app/service/comments.service';
import { Comment } from 'src/app/shared/model/comment.model';
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

  constructor(
    private commentService: CommentsService,
    private auth: AuthService
  ) {
    this.commentService.deleteEvent.subscribe((commentId) => {
      this.deleteComment(commentId);
    });
  }

  ngOnInit(): void {
    this.getArticleComments();
  }

  getArticleComments() {
    this.commentService.getArticle().subscribe(
      (data) => {
        let articleBySlug = data.articles.filter((e) => e.slug == this.slug);
        this.totalLength = articleBySlug[0].comments.length;
        // console.log(articleBySlug[0].comments);

        if (articleBySlug.length > 0) {
          this.comments = articleBySlug[0].comments;
        } else {
          this.comments = [];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  findComment(commentId: number) {
    return this.comments.map((comment) => comment.id).indexOf(commentId);
  }

  addComment(commentValue: string) {
    commentValue = commentValue.trim();
    if (commentValue.length !== 0) {
      const comment = {
        body: commentValue,
      };
      this.commentService
        .postArticleComment(this.slug, { comment: comment })
        .subscribe(
          (data) => {
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#273043',
      cancelButtonColor: '#DC3545',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService
          .deleteArticleComment(this.slug, commentId)
          .subscribe(
            () => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: 'success',
                title: 'Delete comment successfully',
              });
              this.comments.splice(this.findComment(commentId), 1);
            },
            (err) => {
              console.log(err);
            }
          );
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#273043',
        });
      }
    });
  }
}

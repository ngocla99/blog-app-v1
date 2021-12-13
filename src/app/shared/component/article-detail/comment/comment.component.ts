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
  @Input() slug!: string;
  comments: Comment[] = [];
  isLoading!: boolean;

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
    this.commentService.getArticleComments(this.slug).subscribe(
      (data) => {
        this.comments = data.comments;
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
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  deleteComment(commentId: number) {
    this.commentService.deleteArticleComment(this.slug, commentId).subscribe(
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
  }
}

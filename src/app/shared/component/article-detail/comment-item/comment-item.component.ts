import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/model/comment.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CommentsService } from 'src/app/shared/service/comments.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment!: Comment;

  constructor(
    private auth: AuthService,
    private commentService: CommentsService
  ) {}

  ngOnInit(): void {}

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  get currentUser() {
    return this.auth.getUserName();
  }

  deleteComment() {
    this.commentService.deleteEvent.next(this.comment.id);
  }
}

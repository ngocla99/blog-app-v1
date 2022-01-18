import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Article } from '../../model/article.model';
import { Profile } from '../../model/profile.model';
import { ArticleService } from '../../service/article.service';
import { AuthService } from '../../service/auth.service';
import { SwalService } from '../../service/swal.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  articleSlug!: string;
  article!: Article;
  isLoading!: boolean;

  preload: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private swalService: SwalService
  ) {
    this.articleSlug = this.activatedRoute.snapshot.params?.['slug'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.preload = false;
    }, 2000);

    this.getArticle();
  }

  getArticle() {
    this.isLoading = true;
    this.articleService.getArticleBySlug(this.articleSlug).subscribe(
      (data) => {
        this.article = data.article;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.userService
          .getUserProfile(this.article.author.username)
          .subscribe((user) => {
            this.article.author;
            this.article.author = user.profile;
          });
        this.isLoading = false;
      }
    );
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  get currentUser(): string {
    return this.auth.getUserName();
  }

  editArticle(slug: string) {
    this.router.navigate(['editor', slug]);
  }

  deleteArticle(slug: string) {
    this.swalService.delete().then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticle(slug).subscribe(
          () => {
            this.router.navigate(['/profile', this.currentUser]);
          },
          (err) => {
            console.log(err);
          }
        );

        this.swalService.deleteSucceeded();
      }
    });
  }

  favourite() {
    if (!this.auth.isLoggedIn()) {
      this.swalService.goToLogin();
      return;
    }
    this.articleService.favoriteArticle(this.article.slug).subscribe(
      (data) => {
        this.article = data.article;

        this.swalService.interact('fa-heart', 'Favourited', true);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  unfavorite() {
    if (!this.auth.isLoggedIn()) {
      this.swalService.goToLogin();
      return;
    }
    this.articleService.unfavoriteArticle(this.article.slug).subscribe(
      (data) => {
        this.article = data.article;

        this.swalService.interact('fa-heart-broken', 'UnFavourite', true);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  follow() {
    if (!this.auth.isLoggedIn()) {
      this.swalService.goToLogin();
      return;
    }
    this.userService.followUser(this.article.author.username).subscribe(
      (data: { profile?: Profile }) => {
        this.article.author = data.profile!;

        this.swalService.interact('fa-user-plus', 'Followed', true);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  unfollow() {
    if (!this.auth.isLoggedIn()) {
      this.swalService.goToLogin();
      return;
    }
    this.userService.unFollowUser(this.article.author.username).subscribe(
      (data) => {
        this.article.author = data.profile;

        this.swalService.interact('fa-user-minus', 'UnFollowed', true);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/service/article.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { Article } from '../../model/article.model';
import { Profile } from '../../model/profile.model';

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
    private router: Router
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
        this.articleService.deleteArticle(slug).subscribe(
          () => {
            this.router.navigate(['/profile', this.currentUser]);
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

  favourite() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.articleService.favoriteArticle(this.article.slug).subscribe(
      (data) => {
        this.article = data.article;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  unfavorite() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.articleService.unfavoriteArticle(this.article.slug).subscribe(
      (data) => {
        this.article = data.article;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  follow() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.followUser(this.article.author.username).subscribe(
      (data: { profile?: Profile }) => {
        this.article.author = data.profile!;
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  unfollow() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.unFollowUser(this.article.author.username).subscribe(
      (data) => {
        this.article.author = data.profile;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

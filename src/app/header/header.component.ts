import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  activeLink = '';
  constructor(
    private authService: AuthService
  ) // private route: ActivatedRoute,
  // private router: Router
  {}

  ngOnInit(): void {
    // this.route.data.subscribe((data) => {
    //   console.log(data.name);
    // });
  }

  get isLogin() {
    return this.authService.isLoggedIn();
  }

  // onClick(link: string) {
  //   this.activeLink = link;
  //   this.router.navigateByUrl('/' + link);
  // }
}

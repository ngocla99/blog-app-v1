import { Component } from '@angular/core';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'blog-app';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLoad();
  }
}

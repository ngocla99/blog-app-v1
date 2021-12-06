import { Component, OnInit } from '@angular/core';
import { ConnectApiService } from '../service/connect-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private connectApiService: ConnectApiService) {}

  ngOnInit(): void {
    this.connectApiService.getArticles().subscribe((data) => {
      // console.log(data);
    });
  }
}

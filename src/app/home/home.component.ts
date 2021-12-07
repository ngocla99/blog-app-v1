import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ViewMode: 'global' | 'tags' = 'global';
  tags = ["welcome","introduction",'codebaseShow', 'implementations'];
  tagsValue = "";
  constructor() { }

  ngOnInit(): void {
  }

  changeViewMode(view: 'global' | 'tags'){
    this.ViewMode = view;
  }

  sendTag(value : string) : void {
    if(this.ViewMode == 'global'){
      this.ViewMode = 'tags';
      this.tagsValue = value;
    } else {
      this.tagsValue = value;
    }
  }
}

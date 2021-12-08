import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tagMode = false;
  ViewMode: 'global' | 'tags' = 'global';
  tags = ['welcome', 'introduction', 'codebaseShow', 'implementations'];
  tagsValue = '';
  constructor() {}

  ngOnInit(): void {}

  changeViewMode() {
    this.tagMode = false;
    this.ViewMode = 'global';
  }

  sendTag(value: string): void {
    this.tagsValue = value;
    this.tagMode = true;
    this.ViewMode = 'tags';
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  loginForm:boolean=false;
  signupForm:boolean=true;
  constructor() { }

  ngOnInit() {
  }

  toggleTag(){
    this.loginForm=!this.loginForm;
    this.signupForm=!this.signupForm;
  }
}

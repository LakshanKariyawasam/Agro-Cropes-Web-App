import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public username: string = "";
  public name: string = "";

  public show: boolean = false;
  constructor(public router: Router, private zone: NgZone) {

  }


  ngOnInit() {

  }

  logout() {
    console.log("logging out");
    sessionStorage.clear();
    localStorage.clear();
    let me = this;
    this.username;
    this.show = false;
    me.router.navigateByUrl('/');
  }

}

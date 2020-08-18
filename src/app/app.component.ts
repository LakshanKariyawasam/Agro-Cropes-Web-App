import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [UtilService]
})
export class AppComponent {
  menuAllow: boolean;
  title = 'app';

validateUserMenu
  constructor(public router: Router, public util : UtilService) {

    console.log("im rootttt>>>>>");

  }
}
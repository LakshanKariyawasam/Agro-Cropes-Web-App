import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authservice: AuthService) { }

  email = "";
  password: "";
  message = '';

  public loadingMask: boolean;

  errorMsg = ''; //validation error handle

  error: { name: string, message: string } = { name: '', message: '' }; //firebase error handle

  ngOnInit(): void {
  }


  signIn(email, password) {
    this.clearErrorMessage();
    if (this.validateForm(email, password)) {
      this.authservice.SignIn(email, password).catch(() => {
        this.errorMsg = "Wrong password or this account not approved yet.";
      });
    }
  }

  // login() {
  //   this.clearErrorMessage();
  //   if (this.validateForm(this.email, this.password)) {
  //     this.loadingMask = true;
  //     this.authservice.SignIn(this.email, this.password)
  //       .then(() => {
  //         this.loadingMask = false;
  //         this.router.navigate(['/operational-dashboard'])
  //       }).catch(error => {
  //         this.loadingMask = false;
  //         this.errorMsg = "Cannot connect to server: ", error;
  //       })
  //   }
  //   // this.router.navigate(['/dashboard']);
  // }

  validateForm(email, password) {

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
      this.errorMsg = "The email address is badly formatted.";
      return false;
    }

    if (!/^.{6,}$/.test(password)) {
      this.errorMsg = "Password should be at least 6 charactors.";
      return false;
    }
    this.errorMsg = '';
    return true;
  }

  clearErrorMessage() {
    this.errorMsg = '';
    this.error = { name: '', message: '' };
  }

}

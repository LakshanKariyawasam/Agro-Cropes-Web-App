import { Component, OnInit } from '@angular/core';
import { AuthService, UserInterface } from '../services/auth.service';
import { Router } from '@angular/router'
import { auth } from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {



  constructor(private authservice: AuthService, private router: Router) { }

  email = "";
  password = "";
  message = '';
  errorMsg = ''; //validation error handle
  public userInterface = new UserInterface();


  error: { name: string, message: string } = { name: '', message: '' }; //firebase error handle

  ngOnInit(): void {
  }

  register() {
    this.clearErrorMsg();
    console.log("userInterface---->>>>",this.userInterface);
    if (this.validateForm(this.userInterface.email, this.userInterface.password)) {
      this.authservice.registerWithEmail(this.userInterface).then(() => {
        this.message = "Succssfully registered."
        this.userInterface = new UserInterface();
      }).catch(_error => {
        this.error = _error
        this.router.navigate(['/register'])
      })
    }
    
  }

  validateForm(email, password) {
    if (email.lenght === 0) {
      this.errorMsg = "Pleace enter e-mail id.";
      return false;
    }

    if (password.lenght === 0) {
      this.errorMsg = "Pleace enter password.";
      return false;
    }

    if (password.lenght < 6) {
      this.errorMsg = "Password should be at least 6 charactors.";
      return false;
    }
    this.errorMsg = '';
    return true;
  }

  clearErrorMsg() {
    this.errorMsg = '';
    this.error = { name: '', message: '' };
  }
}



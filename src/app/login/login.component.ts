import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Branch } from '../models/Branch';
import { BranchService } from '../services/branch.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, BranchService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authservice: AuthService, public branchService: BranchService) { }

  email = "";
  password: "";
  message = '';

  public loadingMask: boolean;
  public branchList: Branch[] = new Array<Branch>();

  private _dataChange: Subject<Branch> = new Subject<Branch>();
  private _dbPromise;

  errorMsg = ''; //validation error handle

  error: { name: string, message: string } = { name: '', message: '' }; //firebase error handle

  ngOnInit(): void {
  }

  login() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.loadingMask = true;
      this.authservice.loginWithEmail(this.email, this.password)
        .then(() => {
          this.getAllBranch();
          this.router.navigate(['/operational-dashboard'])
        }).catch(_error => {
          this.loadingMask = false;
          this.error = _error
          this.errorMsg = "Cannot connect to server: ", this.error;
          this.router.navigate(['/login'])
        })
    }
    // this.router.navigate(['/dashboard']);
  }

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

  getAllBranch() {
    this.loadingMask = true;
    this.branchService.getAllBranch().subscribe(res => {
      console.log("Branch res  ", res)
      this.branchList = res.data;
      localStorage.setItem('branchList', JSON.stringify(this.branchList));
      this.loadingMask = false;
    }, error => {
      this.loadingMask = false;
    });
  }

}

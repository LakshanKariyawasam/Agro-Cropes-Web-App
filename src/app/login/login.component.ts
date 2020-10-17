import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from '../models/Branch';
import { BranchService } from '../services/branch.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [BranchService]
})
export class LoginComponent implements OnInit {

  public lottieConfig: Object;

  private anim: any;

  public loadingMask: boolean;
  public branchList: Branch[] = new Array<Branch>();

  constructor(private router: Router, public branchService: BranchService) {
    this.lottieConfig = {
      path: '/assets/lottie/business.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  ngOnInit(): void {

  }

  login() {
    this.getAllBranch();
    this.router.navigate(['/operational-dashboard'])
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

  handleAnimation(anim: any) {
    this.anim = anim;
  }

}

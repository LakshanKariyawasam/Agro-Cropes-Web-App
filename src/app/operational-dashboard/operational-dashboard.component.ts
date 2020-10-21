import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Branch } from '../models/Branch';

@Component({
  selector: 'app-operational-dashboard',
  templateUrl: './operational-dashboard.component.html',
  styleUrls: ['./operational-dashboard.component.scss'],
  providers: [DashboardService]
})
export class OperationalDashboardComponent implements OnInit {


  public branchList: Branch[] = new Array<Branch>();
  branchLength: number = 0;
  loadingMask: boolean;

  from: String = null;
  to: String = null;
  lableOne: any;
  lableTwo: any;

  constructor(public dashboardService: DashboardService) {
    this.branchList = JSON.parse(localStorage.getItem('branchList'));
    this.branchLength = this.branchList.length;
    console.log("shortest branch ", this.branchList)
  }

  ngOnInit() {
    this.branchList = JSON.parse(localStorage.getItem('branchList'));
    this.branchLength = this.branchList.length;
    console.log("shortest branch ", this.branchList)
  }

  findShortestPath() {
    this.loadingMask = true;
    this.dashboardService.getShortestPath(this.from, this.to).subscribe(res => {
      console.log("shortest path res  ", res)
      this.lableOne = res.data.lableOne;
      this.lableTwo = res.data.lableTwo;
      this.loadingMask = false;
    }, error => {
      this.loadingMask = false;
    });
  }
}

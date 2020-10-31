import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Branch } from '../models/Branch';
import { ToastrService } from 'ngx-toastr';
import { Distance } from '../models/Distance';

@Component({
  selector: 'app-operational-dashboard',
  templateUrl: './operational-dashboard.component.html',
  styleUrls: ['./operational-dashboard.component.scss'],
  providers: [DashboardService]
})
export class OperationalDashboardComponent implements OnInit {


  public branchList: Branch[] = new Array<Branch>();
  public distanceList: Distance[] = new Array<Distance>();
  branchLength: number = 0;
  loadingMask: boolean;

  from: String = null;
  to: String = null;
  lableOne: String;
  lableTwo: String;

  constructor(public dashboardService: DashboardService,
    public toastr: ToastrService) {
  }

  ngOnInit() {
    this.branchList = JSON.parse(localStorage.getItem('branchList'));
    this.distanceList = JSON.parse(localStorage.getItem('distanceList'));
    this.branchLength = this.branchList.length;
    console.log("shortest branch ", this.branchList)
  }

  findShortestPath() {

    let val = 0;

    this.distanceList.forEach((distance: Distance, index: number) => {
      if (distance.fromDesc === this.from && distance.toDesc === this.to) {
        val = 1;
        this.loadingMask = true;
        this.dashboardService.getShortestPath(this.from, this.to).subscribe(res => {
          console.log("shortest path res  ", res)
          if (res['flag'] == 100) {
            this.lableOne = res.data.lableOne;
            this.lableTwo = res.data.lableTwo;
            this.showSuccess("Shortest path caculation successfully")
            this.loadingMask = false;
          } else {
            this.loadingMask = false;
            this.showError("Please check the distance are correct or wrong.");
          }
        }, error => {
          this.loadingMask = false;
          this.showError(error);
        });
      }
    });

    if (val == 0) {
      this.showError("Please add this location distance first.");
    }
  }

  showSuccess(message) {
    this.toastr.success(message, 'Info!', {
      timeOut: 3000,
    });
  }
  showError(message) {
    this.toastr.error(message, 'Oops!', {
      timeOut: 3000,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Distance } from '../models/Distance';
import { DistanceService } from '../services/distance.service';
import { Branch } from '../models/Branch';

@Component({
  selector: 'app-distance-maintenance',
  templateUrl: './distance-maintenance.component.html',
  styleUrls: ['./distance-maintenance.component.scss'],
  providers: [DistanceService]
})
export class DistanceMaintenanceComponent implements OnInit {

  public distanceModel: boolean;
  public confirmationModel: boolean;

  public distance = new Distance();

  public distanceValidationArray = [];
  public distanceList: Distance[] = new Array<Distance>();
  public branchList: Branch[] = new Array<Branch>();
  public editMode: boolean;
  distanceGroupsForDistance: any;
  loadingMask: boolean;
  innerHeight: any;

  constructor(public distanceService: DistanceService,
    public toastr: ToastrService) {
  }

  ngOnInit() {
    this.innerHeight = (window.outerHeight - 390) + "px";
    this.distanceList = JSON.parse(localStorage.getItem('distanceList'));
    this.branchList = JSON.parse(localStorage.getItem('branchList'));
  }

  openDistanceModel(mode, payload) {
    this.distanceValidationArray = [];
    this.distanceModel = true;

    if (mode == 1) {
      this.editMode = false;
      this.distance = new Distance();
    } else {
      this.editMode = true;
      this.distance = payload;
    }
  }

  editDistance() {
    this.loadingMask = true;
    this.validateDistanceForm();
    if (this.distanceValidationArray.length == 0) {
      this.distanceService.editDistance(this.distance).subscribe(res => {

        if (res['flag'] == 1) {
          this.showSuccess("Distance edit successfully")
          this.branchList.forEach((branch: Branch, index: number) => {
            if (branch.id === this.distance.from) {
              this.distance.fromDesc = branch.branchName;
            }
            if (branch.id === this.distance.to) {
              this.distance.toDesc = branch.branchName;
            }
          });

          this.distanceList.forEach((distance: Distance, index: number) => {
            if (distance.id === this.distance.id) {
              this.distanceList[index] = this.distance;
            }
          });


          localStorage.setItem('distanceList', JSON.stringify(this.distanceList));
          this.distanceModel = false;
          this.loadingMask = false;
        } else {
          this.showError(res['errorMessage']);
          this.distanceList = JSON.parse(localStorage.getItem('distanceList'));
        }
        this.loadingMask = false;
      }, error => {
        this.loadingMask = false;
        this.showError(error);
        this.distanceList = JSON.parse(localStorage.getItem('distanceList'));
      });
    } else {
      this.loadingMask = false;
    }
  }

  addDistance() {
    this.loadingMask = true;
    console.log("distance :::: ", this.distance);
    this.validateDistanceForm();
    if (this.distanceValidationArray.length == 0) {

      this.distanceService.addDistance(this.distance).subscribe(res => {
        console.log("resss ", res)

        if (res['flag'] == 1) {
          this.showSuccess("Distance added successfully")
          this.branchList.forEach((branch: Branch, index: number) => {
            if (branch.id === Number(this.distance.from)) {
              this.distance.fromDesc = branch.branchName;
            }
            if (branch.id === Number(this.distance.to)) {
              this.distance.toDesc = branch.branchName;
            }
          });

          this.distanceList.push(this.distance);


          localStorage.setItem('distanceList', JSON.stringify(this.distanceList));
          this.distanceModel = false;
        } else {
          this.showError(res['errorMessage']);
        }

        this.loadingMask = false;
      }, error => {
        this.loadingMask = false;
        this.showError(error)
      });
    } else {
      this.loadingMask = false;
    }
  }

  deleteDistanceConfirmation(distance) {
    this.distance = distance;
    this.confirmationModel = true;
  }

  deleteDistance() {
    this.distanceService.deleteDistance(this.distance).subscribe(res => {
      console.log("resss ", res)

      if (res['flag'] == 1) {
        this.showSuccess("Distance delete successfully")
        this.distanceList.forEach((distance: Distance, index: number) => {
          if (distance.id === this.distance.id) {
            this.distanceList.splice(index, 1);
          }
        });

        this.confirmationModel = false;


        localStorage.setItem('distanceList', JSON.stringify(this.distanceList));

      } else {
        this.showError(res['errorMessage']);
      }

      this.loadingMask = false;
    }, error => {
      this.loadingMask = false;
      this.showError(error)
    });
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

  from() {
    // this.branchListTo.forEach((branch: Branch, index: number) => {
    //   if (branch.id === Number(this.distance.from)) {
    //     this.branchListTo.splice(index, 1);
    //   }
    // });
  }

  to() {
    // this.branchListFrom.forEach((branch: Branch, index: number) => {
    //   if (branch.id === Number(this.distance.to)) {
    //     this.branchListFrom.splice(index, 1);
    //   }
    // });
  }

  validateDistanceForm() {
    this.distanceValidationArray = [];

    if (this.validateFrom() != "") {
      this.distanceValidationArray.push(this.validateFrom());
    }
    if (this.validateTo() != "") {
      this.distanceValidationArray.push(this.validateTo());
    }
    if (this.validateDistance() != "") {
      this.distanceValidationArray.push(this.validateDistance());
    }
  }

  validateFrom(): string {
    console.log(">>>>>>>>", this.distance)
    let status = (Number(this.distance.from) < 1) ? false : true;
    let str = "";
    if (status == false) {
      str += " Please enter from";
    }
    return str;
  }


  validateTo(): string {
    let status = (Number(this.distance.to) < 1) ? false : true;
    let str = "";
    if (status == false) {
      str += " Please enter to";
    }
    return str;
  }

  validateDistance(): string {
    let status = (Number(this.distance.distance) < 0) ? false : true;
    let str = "";
    if (status == false) {
      str += " Please enter distance";
    }
    return str;
  }

  ngOnDestroy() {
    localStorage.removeItem('distanceList');
    localStorage.setItem('distanceList', JSON.stringify(this.distanceList));
  }
}
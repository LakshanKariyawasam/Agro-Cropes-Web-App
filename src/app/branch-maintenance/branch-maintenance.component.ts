import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Branch } from '../models/Branch';
import { GroupModel } from '../models/GroupModel';
import { BranchService } from '../services/branch.service';
import { GrowlService } from '../services/growl-service.service';
import { MdecodeService } from '../services/mdecode.service';
import { UtilService } from '../services/util.service';
import * as moment from 'moment';


@Component({
  selector: 'app-branch-maintenance',
  templateUrl: './branch-maintenance.component.html',
  styleUrls: ['./branch-maintenance.component.scss'],
  providers: [BranchService, MdecodeService, UtilService]
})
export class BranchMaintenanceComponent implements OnInit {

  public branchModel: boolean;
  public confirmationModel: boolean;

  public branch = new Branch();
  public branchValidationArray = [];
  public branchList: Branch[] = new Array<Branch>();
  public selectedBranchGroups: GroupModel[] = [];
  public editMode: boolean;
  branchGroupsForBranch: any;
  loadingMask: boolean;
  innerHeight: any;

  constructor(public branchService: BranchService, public mdecodeService: MdecodeService,
    public toastr: ToastrService, vcr: ViewContainerRef, public utilService: UtilService, public growl: GrowlService) {
  }

  ngOnInit() {
    this.innerHeight = (window.outerHeight - 390) + "px";
    this.branchList = JSON.parse(localStorage.getItem('branchList'));
    console.log("branchList:::: ", this.branchList)
  }

  openBranchModel(mode, payload) {
    console.log("payload: ", payload);
    this.branchValidationArray = [];
    this.branchModel = true;

    if (mode == 1) {
      this.editMode = false;
      this.branch = new Branch();
    } else {
      this.editMode = true;
      this.branch = payload;
    }
  }

  editBranch() {
    console.log("loading mask: ", this.loadingMask)
    this.loadingMask = true;
    console.log("branch: ", this.branch)
    this.validateBranchForm();
    console.log("loading mask: ", this.branchValidationArray.length);
    if (this.branchValidationArray.length == 0) {
      this.branchList.forEach((branch: Branch, index: number) => {
        if (branch.branchCode === this.branch.branchCode) {
          this.branchList[index] = this.branch;
        }
      });

      console.log("branchList :::: ", this.branchList);
      this.branchModel = false;
      this.loadingMask = false;
    } else {
      this.loadingMask = false;
    }
  }

  addBranch() {
    console.log("loading mask: ", this.loadingMask)
    this.loadingMask = true;

    this.validateBranchForm();
    console.log("loading mask: ", this.branchValidationArray.length);
    if (this.branchValidationArray.length == 0) {
      this.branchList.push(this.branch);

      console.log("branchList :::: ", this.branchList);
      this.branchModel = false;
      this.loadingMask = false;
    } else {
      this.loadingMask = false;
    }
  }

  removeBranchConfirmation(branch) {
    this.branch = branch;
    this.confirmationModel = true;
  }

  removeBranch() {
    this.branchList.forEach((branch: Branch, index: number) => {
      if (branch.branchCode === this.branch.branchCode) {
        this.branchList.pop();
      }
    });

    this.confirmationModel = false;
  }

  showSuccess(message) {
    this.toastr.success(message, 'Info!');
  }
  showError(message) {
    this.toastr.error(message, 'Oops!');
  }


  // addBranch() {
  //   this.validateBranchForm();
  //   if (this.branchValidationArray.length == 0) {

  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'system': 'DMSRFID',
  //         'countryCode': 'LK',
  //         'room': 'DefaultRoom',
  //         'organization': 'DMS',
  //         'department': 'DefaultDepartment',
  //         'branch': 'HeadOffice',
  //         'branchCode': this.utilService.getLoggedInData()[0].branchCode,
  //         'division': 'DMSSW'
  //       })
  //     };

  //     let arrGrps = [];
  //     console.log("this.selectedBranchGroups", this.selectedBranchGroups);
  //     this.selectedBranchGroups.forEach(re => {
  //       let grp = {
  //         "groupId": re.groupId,
  //         "groupName": re.groupName
  //       }
  //       console.log("grp", grp);
  //       arrGrps.push(grp);

  //     })


  //     this.branch.groups = arrGrps;

  //     this.branchService.branch(this.branch, this.utilService.getLoggedInData()[0].branchCode).subscribe(res => {
  //       console.log("resss ", res)
  //       if (res.body.flag == 100) {
  //         this.showSuccess(res.body.successMessages);
  //         this.getAllBranch();
  //         this.branchModel = false
  //       } else {
  //         this.showError(res.body.exceptionMessages);
  //       }
  //       //  this.loadingMask = false;
  //     }, error => {
  //       //  this.loadingMask = false;
  //       this.showError(error);
  //     });

  //     //this.branchService.a
  //   }
  // }


  // editBranch() {
  //   console.log("loading mask: ", this.loadingMask)
  //   this.loadingMask = true;
  //   console.log("loading mask: ", this.loadingMask)
  //   this.validateBranchForm();
  //   console.log("loading mask: ", this.branchValidationArray.length);
  //   if (this.branchValidationArray.length == 0) {

  //     this.branch.countryCode = "LK";
  //     this.branch.organization = "DMS";
  //     this.branch.division = "DMSSW";
  //     this.branch.branch = "HeadOffice";
  //     this.branch.department = "DefaultDepartment";
  //     this.branch.room = "DefaultRoom";

  //     let arrGrps = [];

  //     this.selectedBranchGroups.forEach(re => {
  //       let grp = {
  //         "groupId": re.groupId,
  //         "groupName": re.groupName


  //       }

  //       arrGrps.push(grp);

  //       console.log("loading mask: ", this.loadingMask)
  //       // arrGrps.push(grp);
  //       console.log(">>>>>>>>>>>>grp", grp);

  //     })


  //     this.branch.groups = arrGrps;

  //     // let header: Headers = new Headers();
  //     // let option: RequestOptionsArgs = new RequestOptions();

  //     // header.set("system", "DMSRFID");
  //     // header.set("countryCode", "LK");
  //     // header.set("room", "DefaultRoom");
  //     // header.set("organization", "DMS");
  //     // header.set("department", "DefaultDepartment");
  //     // header.set("branch", "HeadOffice");
  //     // header.set("branchCode", this.utilService.getLoggedInData()[0].branchCode);
  //     // header.set("division", "DMSSW");
  //     // option.headers = header;

  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'system': 'DMSRFID',
  //         'countryCode': 'LK',
  //         'room': 'DefaultRoom',
  //         'organization': 'DMS',
  //         'department': 'DefaultDepartment',
  //         'branch': 'HeadOffice',
  //         'branchCode': this.utilService.getLoggedInData()[0].branchCode,
  //         'division': 'DMSSW'
  //       })
  //     };

  //     this.loadingMask = true;
  //     this.branchService.editBranch(this.branch, this.utilService.getLoggedInData()[0].branchCode).subscribe(res => {
  //       console.log("resss ", res);

  //       if (res.body.flag == 100) {

  //         this.growl.addSingleInfo("Successfully changed branch settings");
  //         this.getAllBranch();
  //         this.branchModel = false;
  //       } else {
  //         this.showError(res.body.exceptionMessages);
  //       }
  //       this.loadingMask = false;
  //     }, error => {
  //       this.loadingMask = false;
  //       this.showError(error)
  //     });
  //   } else {
  //     this.loadingMask = false;
  //   }
  // }

  validateBranchForm() {
    this.branchValidationArray = [];

    if (this.validateBranchID() != "") {
      this.branchValidationArray.push(this.validateBranchID());
    }
    if (this.validateBranchName() != "") {
      this.branchValidationArray.push(this.validateBranchName());
    }
    if (this.validateBranchAddress() != "") {
      this.branchValidationArray.push(this.validateBranchAddress());
    }
    if (this.validateBranchTel() != "") {
      this.branchValidationArray.push(this.validateBranchTel());
    }
    if (this.validateBranchEmail() != "") {
      this.branchValidationArray.push(this.validateBranchEmail());
    }
    if (this.validateBranchStatus() != "") {
      this.branchValidationArray.push(this.validateBranchStatus());
    }
  }


  // validation functions

  validateBranchID(): string {
    console.log(">>>>>>>>", this.branch)
    let status = (this.branch.branchCode == null || this.branch.branchCode == "") ? false : true;
    let str = "";
    if (status == false) {
      str += " Please enter branch ID";
    }
    return str;
  }


  validateBranchName(): string {
    let status = (this.branch.branchName == null || this.branch.branchName == "") ? false : true;
    let str = "";
    if (status == false) {
      str += " Please enter branch name";
    }
    return str;
  }

  validateBranchAddress(): string {
    let status = (this.branch.branchAddress == null || this.branch.branchAddress == "") ? false : true;
    let str = "";
    if (status == false) {
      str += " Please enter branch address";
    }
    return str;
  }

  validateBranchTel(): string {
    let status = (this.branch.branchTel == null || this.branch.branchTel == "0") ? false : true;
    let str = "";
    if (status == false) {
      str += " Please enter branch tel";
    }
    return str;
  }

  validateBranchEmail(): string {
    let status = (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.branch.branchEmail)) ? false : true;
    let str = "";
    if (status == false) {
      str += " The email address is badly formatted.";
    }
    return str;
  }

  validateBranchStatus(): string {
    let status = (this.branch.activeStatus == 0) ? false : true;
    let str = "";
    if (status == false) {
      str += " Please select branch status"
    }
    return str;
  }

  ngOnDestroy() {
    localStorage.removeItem('branchList');
    localStorage.setItem('branchList', JSON.stringify(this.branchList));
  }

}

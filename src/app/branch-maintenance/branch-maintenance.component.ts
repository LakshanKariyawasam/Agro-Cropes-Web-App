import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Branch } from '../models/Branch';
import { BranchService } from '../services/branch.service';


@Component({
  selector: 'app-branch-maintenance',
  templateUrl: './branch-maintenance.component.html',
  styleUrls: ['./branch-maintenance.component.scss'],
  providers: [BranchService]
})
export class BranchMaintenanceComponent implements OnInit {

  public branchModel: boolean;
  public confirmationModel: boolean;

  public branch = new Branch();
  public branchValidationArray = [];
  public branchList: Branch[] = new Array<Branch>();
  public editMode: boolean;
  branchGroupsForBranch: any;
  loadingMask: boolean;
  innerHeight: any;
  branchOld: Branch;

  constructor(public branchService: BranchService,
    public toastr: ToastrService) {
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

    this.branchOld = this.branch;

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

      this.branchService.editBranch(this.branch).subscribe(res => {
        console.log("resss ", res)

        if (res['flag'] == 1) {
          this.showSuccess("Branch edit successfully")
          this.branchList.forEach((branch: Branch, index: number) => {
            if (branch.id === this.branch.id) {
              this.branchList[index] = this.branch;
            }
          });

          console.log("branchList :::: ", this.branchList);
          this.branchModel = false;
          this.loadingMask = false;
        } else {
          this.showError(res['errorMessage'])
          this.branchList.forEach((branch: Branch, index: number) => {
            if (branch.id === this.branch.id) {
              this.branchList[index] = this.branch;
            }
          });
        }
        this.loadingMask = false;
      }, error => {
        this.loadingMask = false;
        this.showError(error)
        this.branchList.forEach((branch: Branch, index: number) => {
          if (branch.id === this.branch.id) {
            this.branchList[index] = this.branch;
          }
        });
      });
    } else {
      this.loadingMask = false;
    }
  }

  addBranch() {
    this.loadingMask = true;
    this.validateBranchForm();
    if (this.branchValidationArray.length == 0) {

      this.branchService.addBranch(this.branch).subscribe(res => {
        console.log("resss ", res)

        if (res['flag'] == 1) {
          this.showSuccess("Branch added successfully")
          this.branchList.push(this.branch);
          this.branchModel = false;
        } else {
          this.showError(res['errorMessage'])
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

  deleteBranchConfirmation(branch) {
    this.branch = branch;
    this.confirmationModel = true;
  }

  deleteBranch() {
    this.branchService.deleteBranch(this.branch).subscribe(res => {
      console.log("resss ", res)

      if (res['flag'] == 1) {
        this.showSuccess("Branch delete successfully")

        console.log("resss ", res)
        this.branchList.forEach((branch: Branch, index: number) => {
          if (branch.id === this.branch.id) {
            this.branchList.splice(index, 1);
          }
        });

        this.confirmationModel = false;

      } else {
        this.showError(res['errorMessage'])
      }
      this.loadingMask = false;
    }, error => {
      this.loadingMask = false;
      this.showError(error)
    });
  }

  showSuccess(message) {
    this.toastr.success(message, 'Info!');
  }
  showError(message) {
    this.toastr.error(message, 'Oops!');
  }

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
  }

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

  ngOnDestroy() {
    localStorage.removeItem('branchList');
    localStorage.setItem('branchList', JSON.stringify(this.branchList));
  }

}

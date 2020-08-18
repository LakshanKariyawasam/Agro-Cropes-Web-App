import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Users } from '../models/users';
import { UserService } from '../services/user.service';
import { MdecodeService } from '../services/mdecode.service';
import { UserDesignation } from '../models/user-designation';
import { ToastrService } from 'ngx-toastr';
import {  HttpHeaders,HttpRequest } from "@angular/common/http";
import { GroupModel } from '../models/GroupModel';
import { LoggedInUserModel } from '../models/LoggedInUserModel';
import { UtilService } from '../services/util.service';
import { GrowlService } from '../services/growl-service.service';


@Component({
  selector: 'app-user-maintenance',
  templateUrl: './user-maintenance.component.html',
  styleUrls: ['./user-maintenance.component.scss'],
  providers: [UserService, MdecodeService, UtilService]
})
export class UserMaintenanceComponent implements OnInit {

  public addNewUserModel: boolean;
  public addNewUser = new LoggedInUserModel();
  public userValidationArray = [];
  public userDesignationList: UserDesignation[] = new Array<UserDesignation>();
  public usersList: Users[] = new Array<Users>();
  public selectedUserGroups: GroupModel[] = [];
  public editMode: boolean;
  public list1: any[];
  public list2: any[];
  public userGroups: GroupModel[];
  public userGroups2: GroupModel[];
  userGroupsForUser: any;
  loadingMask: boolean;

  constructor(public userService: UserService, public mdecodeService: MdecodeService,
    public toastr: ToastrService, vcr: ViewContainerRef, public utilService: UtilService, public growl: GrowlService) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.list1 = [1, 2, 5, 4];
    this.list2 = [8, 7, 4, 6];

  }

  // 
  openAddNewUserModel(mode, payload) {
    console.log("payload: ", payload);
    this.userValidationArray = [];
    this.addNewUserModel = true;
    this.getUserDesignation();


    if (mode == 1) {
      this.getUserGroups(mode, null);
      this.editMode = false;
      this.addNewUser = new LoggedInUserModel();
      this.addNewUser.designation ="0";
      this.addNewUser.lastName = "";
      this.addNewUser.status = "0";
      this.selectedUserGroups= new Array<GroupModel>();
    } else {

      this.editMode = true;
      this.addNewUser = payload;
      this.getUserGroups(mode, payload);
    }
  }

  showSuccess(message) {
    this.toastr.success(message, 'Info!');
  }
  showError(message) {
    this.toastr.error(message, 'Oops!');
  }


  addUser() {
    //this.loadingMask = false;
    // console.log("selectedUsersList: ", this.)
    this.validateUserForm();
    if (this.userValidationArray.length == 0) {
      // let header: Headers = new Headers();
      // let option: RequestOptionsArgs = new RequestOptions();

      const httpOptions = {
        headers: new HttpHeaders({
          'system': 'DMSRFID',
          'countryCode':'LK',
          'room':'DefaultRoom',
          'organization':'DMS',
          'department':'DefaultDepartment',
          'branch':'HeadOffice',
          'userId': this.utilService.getLoggedInData()[0].userId,
          'division':'DMSSW'
        })
      };

      // header.set("system", "DMSRFID");
      // header.set("countryCode", "LK");
      // header.set("room", "DefaultRoom");
      // header.set("organization", "DMS");
      // header.set("department", "DefaultDepartment");
      // header.set("branch", "HeadOffice");
      // header.set("userId", this.utilService.getLoggedInData()[0].userId);
      // header.set("division", "DMSSW");
      // option.headers = header;

      let arrGrps = [];
      console.log("this.selectedUserGroups", this.selectedUserGroups);
      this.selectedUserGroups.forEach(re => {
        let grp = {
          "groupId": re.groupId,
          "groupName": re.groupName
        }
        console.log("grp",grp);
        arrGrps.push(grp);

      })


      this.addNewUser.groups = arrGrps;

      this.userService.addNewUser(this.addNewUser, this.utilService.getLoggedInData()[0].userId).subscribe(res => {
        console.log("resss ", res)
        if (res.body.flag == 100) {
          this.showSuccess(res.body.successMessages);
          this.getAllUsers();
          this.addNewUserModel = false
        } else {
          this.showError(res.body.exceptionMessages);
        }
      //  this.loadingMask = false;
      }, error => {
      //  this.loadingMask = false;
        this.showError(error);
      });

      //this.userService.a
    }
  }


  editUser() {
    console.log("loading mask: ", this.loadingMask)
    this.loadingMask = true;
    console.log("loading mask: ", this.loadingMask)
    this.validateUserForm();
    console.log("loading mask: ", this.userValidationArray.length);
    if (this.userValidationArray.length == 0) {

      this.addNewUser.countryCode = "LK";
      this.addNewUser.organization = "DMS";
      this.addNewUser.division = "DMSSW";
      this.addNewUser.branch = "HeadOffice";
      this.addNewUser.department = "DefaultDepartment";
      this.addNewUser.room = "DefaultRoom";

      let arrGrps = [];

      this.selectedUserGroups.forEach(re => {
        let grp = {
          "groupId": re.groupId,
          "groupName": re.groupName

         
        }
       
        arrGrps.push(grp);

        console.log("loading mask: ", this.loadingMask)
        // arrGrps.push(grp);
        console.log(">>>>>>>>>>>>grp", grp);

      })


      this.addNewUser.groups = arrGrps;

      // let header: Headers = new Headers();
      // let option: RequestOptionsArgs = new RequestOptions();

      // header.set("system", "DMSRFID");
      // header.set("countryCode", "LK");
      // header.set("room", "DefaultRoom");
      // header.set("organization", "DMS");
      // header.set("department", "DefaultDepartment");
      // header.set("branch", "HeadOffice");
      // header.set("userId", this.utilService.getLoggedInData()[0].userId);
      // header.set("division", "DMSSW");
      // option.headers = header;

      const httpOptions = {
        headers: new HttpHeaders({
          'system': 'DMSRFID',
          'countryCode':'LK',
          'room':'DefaultRoom',
          'organization':'DMS',
          'department':'DefaultDepartment',
          'branch':'HeadOffice',
          'userId': this.utilService.getLoggedInData()[0].userId,
          'division':'DMSSW'
        })
      };

      this.loadingMask = true;
      this.userService.editUser(this.addNewUser,this.utilService.getLoggedInData()[0].userId).subscribe(res => {
        console.log("resss ", res);

        if (res.body.flag == 100) {

          this.growl.addSingleInfo("Successfully changed user settings");
          this.getAllUsers();
          this.addNewUserModel = false;
        } else {
          this.showError(res.body.exceptionMessages);
        }
        this.loadingMask = false;
      }, error => {
        this.loadingMask = false;
        this.showError(error)
      });
    }else{
      this.loadingMask = false;
    }
  }



  getUserDesignation() {
    this.mdecodeService.getUserDesignation().subscribe(res => {
      console.log("resss ", res)
      this.userDesignationList = res.responseData;

    }, error => {
    });
  }

  getUserGroupsForUser(userId) {

    console.log("user id grp ", userId);

    const httpOptions = {
      headers: new HttpHeaders({
        'system': 'DMSRFID',
        'countryCode':'LK',
        'room':'DefaultRoom',
        'organization':'DMS',
        'department':'DefaultDepartment',
        'branch':'HeadOffice',
        'userId': this.utilService.getLoggedInData()[0].userId,
        'division':'DMSSW'
      })
    };

    // let header: Headers = new Headers();
    // let option: RequestOptionsArgs = new RequestOptions();

    // header.set("system", "DMSRFID");
    // header.set("countryCode", "LK");
    // header.set("room", "DefaultRoom");
    // header.set("organization", "DMS");
    // header.set("department", "DefaultDepartment");
    // header.set("branch", "HeadOffice");
    // header.set("userId", this.utilService.getLoggedInData()[0].userId);
    // header.set("division", "DMSSW");
    // option.headers = header;
    
    this.loadingMask = true;
    this.userService.getUserGroupForUser( userId,this.utilService.getLoggedInData()[0].userId).subscribe(res => {

      console.log("gro resss ", res.body.data);
      this.selectedUserGroups = res.body.data;
      this.userGroups2 = this.userGroups

      console.log(">>>>>>>>>>>>>>userGroups2>>>>>>>", this.userGroups2);
      console.log(">>>>>>>>>>>>>>SelecteduserGroups>>>>>>>", this.selectedUserGroups);

      for (var i = 0; i < this.selectedUserGroups.length; i++) {
        for (var x = 0; x < this.userGroups2.length; x++) {
          if (this.selectedUserGroups[i].groupId == this.userGroups2[x].groupId) {
            console.log("removing items", this.userGroups2[x]);
            this.userGroups2.splice(this.userGroups2.indexOf(this.userGroups2[x]), 1);
          }
        }
      }


      // this.userGroups2.forEach(ele => {
      //   if(ele.groupId == res.groupId) {

      //     this.userGroups2.splice(this.userGroups2.indexOf(ele), 1);
      //     console.log(">>>>>>>>>>>>>>final", this.userGroups2);
      //   }
      // })

      // this.selectedUserGroups.forEach(element => {
      //   console.log("element... ",element)
      //   let idx = this.userGroups.findIndex(element.groupId);

      //   if(idx>-1){
      //     this.userGroups.splice(idx,1);
      //   }


      // }); 
      this.loadingMask = false;

    }, error => {
      this.loadingMask = false;
    });
  }

  getUserGroups(mode, payload) {

    const httpOptions = {
      headers: new HttpHeaders({
        'system': 'DMSRFID',
        'countryCode':'LK',
        'room':'DefaultRoom',
        'organization':'DMS',
        'department':'DefaultDepartment',
        'branch':'HeadOffice',
        'userId': this.utilService.getLoggedInData()[0].userId,
        'division':'DMSSW'
      })
    };
    // let header: Headers = new Headers();
    // let option: RequestOptionsArgs = new RequestOptions();

    // header.set("system", "DMSRFID");
    // header.set("countryCode", "LK");
    // header.set("room", "DefaultRoom");
    // header.set("organization", "DMS");
    // header.set("department", "DefaultDepartment");
    // header.set("branch", "HeadOffice");
    // header.set("userId", this.utilService.getLoggedInData()[0].userId);
    // header.set("division", "DMSSW");
    // option.headers = header;

    this.userService.getUserGroups(this.utilService.getLoggedInData()[0].userId).subscribe(res => {
      console.log("gro resss ", res.body.data);
      this.userGroups = new Array<GroupModel>();
      this.userGroups = res.body.data;
      this.userGroups2 = this.userGroups;
      console.log("usersList: ", this.userGroups);

      if (mode == 2) {
        this.getUserGroupsForUser(payload.userId);
      }

      // this.usersList = res.responseData;
    }, error => {
    });
  }

  getAllUsers() {

    this.loadingMask = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'system': 'DMSRFID',
        'countryCode':'LK',
        'room':'DefaultRoom',
        'organization':'DMS',
        'department':'DefaultDepartment',
        'branch':'HeadOffice',
        'userId': this.utilService.getLoggedInData()[0].userId,
        'division':'DMSSW'
      })
    };
    // let header: Headers = new Headers();
    // let option: RequestOptionsArgs = new RequestOptions();

    // header.set("system", "DMSRFID");
    // header.set("countryCode", "LK");
    // header.set("room", "DefaultRoom");
    // header.set("organization", "DMS");
    // header.set("department", "DefaultDepartment");
    // header.set("branch", "HeadOffice");
    // header.set("userId", this.utilService.getLoggedInData()[0].userId);
    // header.set("division", "DMSSW");
    // option.headers = header;

    // test
    this.userService.getAllUsers(this.utilService.getLoggedInData()[0].userId).subscribe(res => {
      console.log("user resss ", res.body.data);
      this.usersList = res.body.data;
      console.log("usersList: ", this.usersList);
      // this.usersList = res.responseData;
      this.loadingMask = false;
    }, error => {
      this.loadingMask = false;
    });
  }



  validateUserForm() {
    this.userValidationArray = [];

    if (this.validateUserID() != "") {
      this.userValidationArray.push(this.validateUserID());
    }
    if (this.validateUserName() != "") {
      this.userValidationArray.push(this.validateUserName());
    }
    if (this.validateLastName() != "") {
      this.userValidationArray.push(this.validateLastName());
    }
    if (this.validateUserDesignation() != "") {
      this.userValidationArray.push(this.validateUserDesignation());
    }
    if (this.validateUserStatus() != "") {
      this.userValidationArray.push(this.validateUserStatus());
    }
  }


  // validation functions

  validateUserID(): string {
    console.log(">>>>>>>>", this.addNewUser)
    let status = (this.addNewUser.userId == null || this.addNewUser.userId.trim() == "") ? false : true;
    let str = "";
    if (status == false) {
      str += " Please enter user ID";
    }
    return str;
  }


  validateUserName(): string {
    let status = (this.addNewUser.firstName == null || this.addNewUser.firstName.trim() == "") ? false : true;
    let str = "";
    if (status == false) {
      str += " Please enter first name";
    }
    return str;
  }

  validateLastName(): string {
    let status = (this.addNewUser.lastName == null || this.addNewUser.lastName.trim() == "") ? false : true;
    let str = "";
    if (status == false) {
      str += " Please enter last name";
    }
    return str;
  }

  validateUserDesignation(): string {
    let status = (this.addNewUser.designation == null||this.addNewUser.designation == "0") ? false : true;
    let str = "";
    if (status == false) {
      str += " Please select designation";
    }
    return str;
  }


  validateUserStatus(): string {
    let status = (this.addNewUser.status == "0") ? false : true;
    let str = "";
    if (status == false) {
      str += " Please select user status"
    }
    return str;
  }


}

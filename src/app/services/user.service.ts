import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../models/response-wrapper';
import { UserBusinessStructureModel } from '../models/user-business-structure';
import { AppParams } from '../app.module';
import { Res } from '../models/response';
import { Branch } from '../models/Branch';

@Injectable()
export class UserService {

  constructor(public http: HttpClient) { }

  public getAllBranch() {
    return this.http.get<Res>(AppParams.BASE_PATH + "BranchService/getBranchDetails");
  }

  public getUserDetails(userName) {
    return this.http.get<ResponseWrapper<UserBusinessStructureModel>>(AppParams.BASE_PATH + "user/getUsers?userId=" + userName);
  }

  // ,headers:options}
  /**
     * 
     * @param url 
     * @param query 
     * @param options 
     */
  public processPostWithHeaders(url: string, query: any, options) {
    return this.http.post<Res>(url, query, { observe: 'response', headers: { 'observe': 'response', 'system': 'DMSRFID', 'systemType': 'CMS' } });
  }

  public addNewUser(payload, user) {
    return this.http.put<Res>(AppParams.BASE_PATH + "user/addUser", payload, {
      observe: 'response', headers: {
        'system': 'DMSRFID',
        'countryCode': 'LK',
        'room': 'DefaultRoom',
        'organization': 'DMS',
        'department': 'DefaultDepartment',
        'branch': 'HeadOffice',
        'userId': user,
        'division': 'DMSSW'
      }
    });
  }

  /**
     *  
     * @param options - Option with header params. If there is no header put null
     */
  public getUserGroups(user) {
    return this.http.get<Res>(AppParams.BASE_PATH + "user/getGroup?page=1&start=0&limit=25", {
      observe: 'response', headers: {
        'system': 'DMSRFID',
        'countryCode': 'LK',
        'room': 'DefaultRoom',
        'organization': 'DMS',
        'department': 'DefaultDepartment',
        'branch': 'HeadOffice',
        'userId': user,
        'division': 'DMSSW'
      }
    });
  }

  /**
    *  
    * @param options - Option with header params. If there is no header put null
    */
  public getUserGroupForUser(userId, user) {
    return this.http.get<Res>(AppParams.BASE_PATH + "user/getUserGroup?page=1&start=0&limit=2500&userId=" + userId, {
      observe: 'response', headers: {
        'system': 'DMSRFID',
        'countryCode': 'LK',
        'room': 'DefaultRoom',
        'organization': 'DMS',
        'department': 'DefaultDepartment',
        'branch': 'HeadOffice',
        'userId': user,
        'division': 'DMSSW'
      }
    });
  }

  // old
  // public getAllUsers() {
  //   return this.http.get<ResponseWrapper<Users>>(AppParams.BASE_PATH + "user/getAllUsers");
  // }

  public editUser(payload, user) {
    return this.http.post<Res>(AppParams.BASE_PATH + "user/editUser", payload, {
      observe: 'response', headers: {
        'system': 'DMSRFID',
        'countryCode': 'LK',
        'room': 'DefaultRoom',
        'organization': 'DMS',
        'department': 'DefaultDepartment',
        'branch': 'HeadOffice',
        'userId': user,
        'division': 'DMSSW'
      }
    });
  }

  private extractData(res: Response) {
    return res.json() || {};
  }


}

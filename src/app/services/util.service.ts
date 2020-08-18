import { Injectable } from '@angular/core';
import { TagType } from '../models/tag-type';
import { UserBusinessStructureModel } from '../models/user-business-structure';
import { LoggedInUserModel } from '../models/LoggedInUserModel';
import { FunctionModel } from '../models/FunctionModel';

@Injectable()
export class UtilService {

  constructor() {


  }

  public storeData(key, obj) {

    let dataStr = btoa(JSON.stringify(obj));

    sessionStorage.setItem(key, dataStr);


  }

  public getData(key) {

    let dataStr = atob(sessionStorage.getItem(key));

    return JSON.parse(dataStr);

  }


  public setTagTypes(obj: Array<TagType>) {


    let dataStr = btoa(JSON.stringify(obj));

    sessionStorage.setItem("tagType", dataStr);

  }

  public validateUserMenu(menuId) {

    let functionsArray = this.getLoggedInData()


    if (functionsArray.length>0) {

      let functions: FunctionModel[] = functionsArray[0].functions;

      if (functions.length > 0) {
        let idx = functions.findIndex(r => r.functionId == menuId);

        if (idx == -1) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }


  }

  public getTagTypes(): Array<TagType> {
    let dataStr = atob(sessionStorage.getItem("tagType"));
    return JSON.parse(dataStr);
  }

  public setUserData(obj: UserBusinessStructureModel) {
    let dataStr = btoa(JSON.stringify(obj));
    sessionStorage.setItem("user", dataStr);
  }


  public getUserData(): UserBusinessStructureModel {
    let dataStr = atob(sessionStorage.getItem("user"));
    return JSON.parse(dataStr);
  }

  public setLoggedInData(obj: LoggedInUserModel) {
    let dataStr = btoa(JSON.stringify(obj));
    sessionStorage.setItem("loggedIn", dataStr);
  }

  public getLoggedInData(): LoggedInUserModel[] {
    let sess = sessionStorage.getItem("loggedIn");
    let dataStr = JSON.stringify(new LoggedInUserModel());
    if(sess !=null){
      dataStr = atob(sess);
    }
   // console.log("dataStr>>>>>>>>>>>>>",dataStr)
    return JSON.parse(dataStr);
  }

  public getJsonObj(str: string) {
    return JSON.parse(str);
  }

}

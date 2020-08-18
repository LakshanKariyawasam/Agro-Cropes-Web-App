import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../models/response-wrapper';
import { AppParams } from '../app.module';
// import { AddNewReader } from 'app/models/add-new-reader';
import { ActiveReades } from '../models/active-readers';
import { Verification } from '../models/verification';

@Injectable()
export class VerificationService {

  constructor(public http: HttpClient) { }

  public addVerification(payload) {
    console.log("PALYLOAD",payload)
    return this.http.post(AppParams.BASE_PATH + "verification/addVerification", payload);
  }

  public getVerificationLocations() {
    return this.http.get<ResponseWrapper<Verification>>(AppParams.BASE_PATH + "verification/getVerificationLocations");
  }

  public getVerification() {
    return this.http.get<ResponseWrapper<Verification>>(AppParams.BASE_PATH + "verification/getVerification");
  }

  public updateVerificationStatus(payload) {
    return this.http.post(AppParams.BASE_PATH + "verification/updateVerificationStatus", payload);
  }

  public getVerificationView(veriID){
    return this.http.get<ResponseWrapper<Verification>>(AppParams.BASE_PATH + "verification/getVerificationView?verID="+veriID);
  }
  
}

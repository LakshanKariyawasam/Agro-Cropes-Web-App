import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../models/response-wrapper';
import { AppParams } from '../app.module';
import { GRNSerialQty } from '../models/grn-model';


@Injectable()
export class GRNService {

  constructor(public http: HttpClient) { }
  
  public getGRNSerials(payload) {
    return this.http.get<ResponseWrapper<GRNSerialQty>>(AppParams.BASE_PATH + "GRNData/getGRNDataByGRNNo?GRNNO="+payload );
  }

  public updateRemainingQty(payload) {
    return this.http.post(AppParams.BASE_PATH + "GRNData/updateRemainingQty", payload);
  }

  public saveGrn(payload) {
    return this.http.post(AppParams.BASE_PATH + "GRNData/saveGrn", payload);
  }

  public writeToTag(payload) {    
    return this.http.post(AppParams.BASE_PATH + "GRNData/writeTag", payload);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../models/response-wrapper';
import { AppParams } from '../app.module';
import { Getmismatch } from '../models/mismatch';
import { GetmismatchSerial} from '../models/mismatch-serial';

@Injectable()
export class MismatchService {

  constructor(public http: HttpClient) { }

  public getMismatchData() {
   return this.http.get<ResponseWrapper<Getmismatch>>(AppParams.BASE_PATH + "mismatch/getMismatchUpdate");
   // return this.http.get<ResponseWrapper<Getmismatch>>("http://192.0.0.39:8080/RPIS_API-1.0/api/mismatch/getMismatchUpdate");
  }

  public getMismatchDatabyGRNno(grnNo) {
    return this.http.get<ResponseWrapper<Getmismatch>>(AppParams.BASE_PATH + "mismatch/getMismatchDatabyGRNno?GRNno="+grnNo+"");
    // return this.http.get<ResponseWrapper<Getmismatch>>("http://192.0.0.39:8080/RPIS_API-1.0/api/mismatch/getMismatchUpdate");
   }

  public getMismatchSerial(itemId) {
     return this.http.get<ResponseWrapper<GetmismatchSerial>>(AppParams.BASE_PATH + "mismatch/getMismatchSerial?itemId="+itemId+"");
     //return this.http.get<ResponseWrapper<GetmismatchSerial>>("http://192.0.0.39:8080/RPIS_API-1.0/api/mismatch/getMismatchSerial?itemId="+itemId+"");
   }

   public addSerial(GetmismatchSerial) {
     return this.http.post(AppParams.BASE_PATH + "mismatch/addSerial",GetmismatchSerial);
    // return this.http.post<ResponseWrapper<GetmismatchSerial>>("http://192.0.0.39:8080/RPIS_API-1.0/api/mismatch/addSerial",GetmismatchSerial);
     //return this.http.post("http://192.0.0.39:8080/RPIS_API-1.0/api/mismatch/addSerial",GetmismatchSerial);

   }

   public removeSerial(GetmismatchSerial) {
     return this.http.post(AppParams.BASE_PATH + "mismatch/removeSerial",GetmismatchSerial);
     //return this.http.post<ResponseWrapper<GetmismatchSerial>>("http://192.0.0.39:8080/RPIS_API-1.0/api/mismatch/removeSerial",GetmismatchSerial);
     //return this.http.post("http://192.0.0.39:8080/RPIS_API-1.0/api/mismatch/removeSerial",GetmismatchSerial);
   }

  public UpdateMismatchQty(GetmismatchSerial){
    return this.http.post(AppParams.BASE_PATH + "mismatch/updateMismatchQty",GetmismatchSerial);
  }   
       
}

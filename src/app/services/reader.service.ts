import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../models/response-wrapper';
// import { Headers, RequestOptions } from "@angular/http";
import { AppParams } from '../app.module';
import { AddNewReader } from '../models/add-new-reader';
import { ActiveReades } from '../models/active-readers';

@Injectable()
export class ReaderService {

  constructor(public http: HttpClient) { }


  public addReader(payload) {
    return this.http.post(AppParams.BASE_PATH + "reader/addReader", payload);
  }


  public getchReaders() {
    return this.http.get<ResponseWrapper<AddNewReader>>(AppParams.BASE_PATH + "reader/getReader");
  }

  public editReader(payload) {
    return this.http.put(AppParams.BASE_PATH + "reader/editReader", payload);
  }

  public getActiveReaders() {
    return this.http.get<ResponseWrapper<ActiveReades>>(AppParams.BASE_PATH + "reader/getReaderNames");
  }


  // public getPendingBatch() {
  //   return this.http.get<ResponseWrapper<AddNewBatch>>(AppParams.BASE_PATH + "batch/getBatch?batchStatus=1");
  // }

  // public getPendingBatchById(batchNo) {
  //   return this.http.get<ResponseWrapper<AddNewBatch>>(AppParams.BASE_PATH + "batch/getBatch?batchId=" + batchNo + "&itemStatus=1");
  // }

  // public assignBatchItem(itm: AddNewBatch, user) {

  //   return this.http.put<ResponseWrapper<AddNewBatch>>(AppParams.BASE_PATH + "batch/assignBatchItem", itm, user);

  // }


}

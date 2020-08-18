import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../models/response-wrapper';
import { AppParams } from '../app.module';
import { Locations } from '../models/locations';
import { Antenna } from '../models/antenna';
import { AddNewAntenna } from '../models/add-new-antenna';

@Injectable()
export class AntennaService {

  constructor(public http: HttpClient) { }


  public getAntenna() {
    return this.http.get<ResponseWrapper<Antenna>>(AppParams.BASE_PATH + "antenna/getAntenna");
  }

  public assignAntenna(payload) {
    return this.http.put(AppParams.BASE_PATH + "antenna/assignAntenna", payload);
  }

  public addNewAntenna(payload) {
    return this.http.post(AppParams.BASE_PATH + "antenna/addAntena", payload);
  }

  public getAllAntenna() {
    return this.http.get<ResponseWrapper<AddNewAntenna>>(AppParams.BASE_PATH + "antenna/getAntenaAll");
  }

  public editAntenna(payload) {
    return this.http.put(AppParams.BASE_PATH + "antenna/editAntenna", payload);
  }

  public getActiveAntenna() {
    return this.http.get<ResponseWrapper<AddNewAntenna>>(AppParams.BASE_PATH + "antenna/getAntenaAllActive");
  }

}

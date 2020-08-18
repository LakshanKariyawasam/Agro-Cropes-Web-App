import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../models/response-wrapper';
import { AppParams } from '../app.module';
import { Locations } from '../models/locations';
import { AddNewAntenna } from '../models/add-new-antenna';
import { AddNewLocation } from '../models/add-new-location';
import { Users } from '../models/users';

@Injectable()
export class LocationsService {

  constructor(public http: HttpClient) { }


  public getLocations() {
    return this.http.get<ResponseWrapper<Locations>>(AppParams.BASE_PATH + "location/getAllLocation");
  }

  public addLocation(payload) {
    return this.http.post(AppParams.BASE_PATH + "businessStructure/addLocationToBusiness", payload);
  }

  public addAntennaToLocation(locId, user, payload) {
    return this.http.put(AppParams.BASE_PATH + "antenna/assignAntennaToLocation?locationId=" + locId + "&user=" + user, payload);
  }

  public addUserToLocation(locId, payload) {
    return this.http.put(AppParams.BASE_PATH + "user/assignUsersToLocation?locationId=" + locId, payload);
  }

  public getLocationAntenna() {
    return this.http.get<ResponseWrapper<AddNewAntenna>>(AppParams.BASE_PATH + "antenna/getAntenaAllActive");
  }

  public getLocationDetails(locID) {
    return this.http.get<ResponseWrapper<AddNewLocation>>(AppParams.BASE_PATH + "location/getLocationDetails/" + locID);
  }

  public getLocationActiveAntenna(locID) {
    return this.http.get<ResponseWrapper<AddNewAntenna>>(AppParams.BASE_PATH + "antenna/geSelectedAntennas/" + locID);
  }

  public getLocationAvailableUsers() {
    return this.http.get<ResponseWrapper<Users>>(AppParams.BASE_PATH + "user/getAllActiveUsers");
  }

  public getLocationAddedUsers(locID) {
     return this.http.get<ResponseWrapper<Users>>(AppParams.BASE_PATH + "user/getAllSelectedUsers/" + locID);
  }

  public setParentLocID(locID,parentID) {
    return this.http.get<ResponseWrapper<Locations>>(AppParams.BASE_PATH + "location/setParentLocId?locationId=" + locID+"&parentLocId="+parentID);
 }

  public editLocation(payload) {
    return this.http.put(AppParams.BASE_PATH + "location/editLocation", payload);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../models/response-wrapper';
import { TagType } from '../models/tag-type';
import { AppParams } from '../app.module';
import { ContainerTypeColor } from '../models/container-type-color';
import { LocationType } from '../models/location-type';
import { UserDesignation } from '../models/user-designation';
import { MDCode } from '../models/MDCode';

@Injectable()
export class MdecodeService {

  constructor(public http: HttpClient) { }


  
  public getAntennaType() {
    return this.http.get<ResponseWrapper<MDCode>>(AppParams.BASE_PATH + "utility/getDataFromMDCode?domain=ANTENNA_TYPE");
  }

  public getTagType() {
    return this.http.get<ResponseWrapper<TagType>>(AppParams.BASE_PATH + "utility/getDataFromMDCode?domain=TAG_TYPE");
  }

  public getContainerTypeColor() {
    return this.http.get<ResponseWrapper<ContainerTypeColor>>(AppParams.BASE_PATH + "utility/getDataFromMDCode?domain=CONTAINER COLOUR");
  }

  public getLocationType() {
    return this.http.get<ResponseWrapper<LocationType>>(AppParams.BASE_PATH + "utility/getDataFromMDCode?domain=LOCATION_TYPE");
  }

  public getUserDesignation() {
    return this.http.get<ResponseWrapper<UserDesignation>>(AppParams.BASE_PATH + "utility/getDataFromMDCode?domain=DESIGNATION_TYPE");
  }

}

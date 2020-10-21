import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppParams } from '../app.module';
import { Res } from '../models/response';

@Injectable()
export class DistanceService {

    constructor(public http: HttpClient) { }

    public getAllDistance() {
        return this.http.get<Res>(AppParams.BASE_PATH + "DistanceService/getDistanceDetails");
    }

    public addDistance(payload) {
        return this.http.post(AppParams.BASE_PATH + "DistanceService/addDistance", payload);
    }

    public editDistance(payload) {
        return this.http.post(AppParams.BASE_PATH + "DistanceService/editDistance", payload);
    }

    public deleteDistance(payload) {
        return this.http.delete(AppParams.BASE_PATH + "DistanceService/deleteDistance", payload);
    }

}

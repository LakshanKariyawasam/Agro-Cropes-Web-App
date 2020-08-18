import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../models/response-wrapper';
import { AppParams } from '../app.module';
import { PhysicalIssues } from '../models/physicalissues';



@Injectable()
export class StrategicDashboardService {

    constructor(public http: HttpClient) { }

public getPhysicalIssueItems(fromDate, toDate, category, location) {
    return this.http.get<ResponseWrapper<PhysicalIssues>>(AppParams.BASE_PATH + "dashboard/getPhysicalIssueItems?fromDate="+fromDate+"&toDate="+toDate+"&category="+category+"&location="+location);

}
}
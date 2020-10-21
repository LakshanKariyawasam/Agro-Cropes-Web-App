import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppParams } from '../app.module';

@Injectable()
export class CustomReportService {

    constructor(public http: HttpClient) { }


    //   public getActiveContainerType() {
    //     return this.http.get<ResponseWrapper<ActiveContainerTypes>>(AppParams.BASE_PATH + "container/getContainerTypesFroSelection");
    //   }

    // public assignAntenna(payload) {
    //   return this.http.put(AppParams.BASE_PATH + "antenna/assignAntenna", payload);
    // }

    public addNewReport(payload) {
        return this.http.post(AppParams.BASE_PATH + "reportService/createReport", payload);
    }

    // public getAllReport() {
    //     return this.http.get<ResponseWrapper<AddNewReport>>(AppParams.BASE_PATH + "reportService/getReportList");
    // }

    public editReport(payload) {
        return this.http.post(AppParams.BASE_PATH + "reportService/updateReport", payload);
    }

    public generateReport(payload) {
        return  AppParams.BASE_PATH + "reportService/getReport?query="+payload['query']+"&reportName="+payload['reportName']+"&reportId="+payload['reportId'];
    }

    public deleteReport(payload) {
        return this.http.post(AppParams.BASE_PATH + "reportService/deleteReport", payload);
    }

}

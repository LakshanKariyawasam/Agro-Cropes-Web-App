import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemMaster } from '../models/item-master';
import { ResponseWrapper } from '../models/response-wrapper';
import { AppParams } from '../app.module';
import { ProductionChart } from '../models/dashboard-production-chart';
import {StockQty} from '../models/stockQty';
import {Transaction} from '../models/transaction';
import {AuditDataList} from '../models/audit-data-list';
import {DropChart} from '../models/drop-chart';
import {AcceptModel} from '../models/acceptmodel';
import {Shipment} from '../models/shipment';
import { PickListDashboard } from '../models/picklist_dashboard'
import { CategoryDashboard } from '../models/category_dashboard'
import { Trans } from '../models/trans'
import { StockPositionModal } from '../models/stock-position';


@Injectable()
export class DashboardService {

    constructor(public http: HttpClient) { }


    public getMoreProductionChart() {
        return this.http.get<ResponseWrapper<ProductionChart>>(AppParams.BASE_PATH + "batch/getProductionChartDtl");
    }



    public getProductionBatchSummaryReportDtl(fromDate,toDate,status) {
        return this.http.get(AppParams.BASE_PATH + "batch/getProductionBatchSummaryReportDtl?fromDate="+fromDate+"&toDate="+toDate+"&status="+status);
    }

    public getStock(url) {
        return this.http.get(url);
      }

      public getStockQty(){
        return this.http.get<ResponseWrapper<StockQty>>(AppParams.BASE_PATH + "dashboard/getStockDetails");
    }

    public getTransaction(){
        return this.http.get<ResponseWrapper<Transaction>>(AppParams.BASE_PATH + "dashboard/getTransSummaryForBarCode");
    }

    public getTrans(){
        return this.http.get<ResponseWrapper<Trans>>(AppParams.BASE_PATH + "dashboard/getTrans");
    }

    public getAuditDataList(fromDate,toDate) {
        return this.http.get<ResponseWrapper<AuditDataList>>(AppParams.BASE_PATH + "dashboard/getItemAudit?fromDate="+fromDate+"&toDate="+toDate);
    }

    public getItemId() {
        return this.http.get<ResponseWrapper<string>>(AppParams.BASE_PATH + "dashboard/getItemID");
    }

    public getDropInChartD() {
        return this.http.get<ResponseWrapper<DropChart>>(AppParams.BASE_PATH + "dashboard/getDropBinTrans");
    }

    // public getAcceptModel(fromDate,toDate) {
    //     return this.http.get<ResponseWrapper<AcceptModel>>(AppParams.WEB_SOCKET_PATH + "dashboard/getAcceptedCnt/"+fromDate+"/"+toDate);
    // }

    public getAcceptModel(fromDate,toDate) {
        return this.http.get<ResponseWrapper<AcceptModel>>(AppParams.BASE_PATH + "dashboard/getAcceptedCnt?fromDate="+fromDate+"&toDate="+toDate);
    }

    public getShipmentData(shipmentNo){
        return this.http.get<ResponseWrapper<Shipment>>(AppParams.BASE_PATH + "dashboard/getShipmentChartData?shipmentNo="+shipmentNo);
    }

    public getShipmentNo(){
        return this.http.get<ResponseWrapper<Shipment>>(AppParams.BASE_PATH + "dashboard/getShipmentNo");
    }

    public getPickListSummary(fromDate,toDate){
        return this.http.get<ResponseWrapper<PickListDashboard>>(AppParams.BASE_PATH + "dashboard/getPickListSummary?fromDate="+fromDate+"&toDate="+toDate);
    }

    public getShipmentSummary(fromDate,toDate){
       console.log("ssssssssssssss"+fromDate+"d"+toDate)
        return this.http.get<ResponseWrapper<Shipment>>(AppParams.BASE_PATH + "dashboard/getShipmentSummary?fromDate="+fromDate+"&toDate="+toDate);
    }

    // public getPickListSummary(fromDate,toDate){
    //     return this.http.get<ResponseWrapper<PickListDashboard>>(AppParams.WEB_SOCKET_PATH + "dashboard/getPickListSummary/"+fromDate+"/"+toDate);
    // }

    // public getShipmentSummary(fromDate,toDate){
    //    console.log("ssssssssssssss"+fromDate+"d"+toDate)
    //     return this.http.get<ResponseWrapper<Shipment>>(AppParams.WEB_SOCKET_PATH + "dashboard/getShipmentSummary/"+fromDate+"/"+toDate);
    // }

    public getPickListName() {
        return this.http.get<ResponseWrapper<PickListDashboard>>(AppParams.BASE_PATH + "dashboard/getPickListName");
    }

    public getPickListItem(ID) {
        return this.http.get<ResponseWrapper<PickListDashboard>>(AppParams.BASE_PATH + "dashboard/getPickListItem?ID="+ID);
    }

    public getCategoryName() {
        return this.http.get<ResponseWrapper<CategoryDashboard>>(AppParams.BASE_PATH + "dashboard/getCategoryName");
    }

    public getCategoryItem(name) {
        return this.http.get<ResponseWrapper<CategoryDashboard>>(AppParams.BASE_PATH + "dashboard/getCategoryItem?Name="+name);
    }

    public getCategorySerial(name) {
        return this.http.get<ResponseWrapper<CategoryDashboard>>(AppParams.BASE_PATH + "dashboard/getCategorySerial?Name="+name);
    }

    public getShipmentSummaryList(status,fromDate,toDate) {
        return this.http.get<ResponseWrapper<Shipment>>(AppParams.BASE_PATH + "dashboard/getShipmentSummaryList?status="+status+"&fromDate="+fromDate+"&toDate="+toDate);
    }

    public getPickListSummaryList(status,fromDate,toDate) {
        return this.http.get<ResponseWrapper<PickListDashboard>>(AppParams.BASE_PATH + "dashboard/getPickListSummaryList?status="+status+"&fromDate="+fromDate+"&toDate="+toDate);
    }
    public getStockPosition(){
        return this.http.get<ResponseWrapper<StockPositionModal>>(AppParams.BASE_PATH + "dashboard/getStockPosition");
    }
    public getWarehouseDetails(){
        return this.http.get<ResponseWrapper<StockPositionModal>>(AppParams.BASE_PATH + "dashboard/getWarehouseDetails");
    }

    public getStockPositionDetails(itemNo){
        return this.http.get<ResponseWrapper<StockPositionModal>>(AppParams.BASE_PATH + "dashboard/getStockPositionDetails?itemNo="+itemNo);


    }
    
}


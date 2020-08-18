import { Component, OnInit } from '@angular/core';
import { AppParams } from '../app.module';
import { DashboardService } from '../services/dashboard.service';
import { StockQty } from '../models/stockQty';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-operational-dashboard',
  templateUrl: './operational-dashboard.component.html',
  styleUrls: ['./operational-dashboard.component.scss'],
  providers: [DashboardService]
})
export class OperationalDashboardComponent implements OnInit {

  constructor(public util: UtilService, public dashboardService: DashboardService) { }

  ngOnInit() {
    this.getStockQty();
  }

  public ws:any;
  public newStockData: StockQty = new StockQty();
  public stQtyArray = [];
  public phQtyArray = [];
  public vaQtyArray = [];

  getStockQty() {
   
    let me = this;
    me.ws = new WebSocket(AppParams.WEB_SOCKET_PATH + "getStockDetails");
    me.ws.onopen = function (event) {

    }

    me.ws.onmessage = function (event) {

      let mapJson = me.util.getJsonObj(event.data)

      if (mapJson['responseCode'] == 1) {
        let data = mapJson['responseData'];

        data.forEach(element => {
          me.newStockData = element;
          
        });
      }
    }

    return me.ws;
  }

}

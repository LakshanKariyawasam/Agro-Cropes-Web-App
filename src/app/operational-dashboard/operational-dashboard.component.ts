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
  }

  public ws: any;
  public newStockData: StockQty = new StockQty();
  public stQtyArray = [];
  public phQtyArray = [];
  public vaQtyArray = [];

}

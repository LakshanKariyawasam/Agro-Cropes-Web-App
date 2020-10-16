import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';
import { AppParams } from '../app.module';
import { AuditDataList } from '../models/audit-data-list';
import { PickListDashboard } from '../models/picklist_dashboard';
import { Shipment } from '../models/shipment';
import { StockDetails } from '../models/stock-details';
import { StockQty } from '../models/stockQty';
import { DashboardService } from '../services/dashboard.service';
// import { Chart } from 'chart.js';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  public todayDate = new Date();

  stockChartData: Chart;
  allInOneChartData: Chart;
  dropInChartData: Chart;

  public stockDetailsData = new Array<StockDetails>();
  public shipmentData = [];
  public pickListData = [];

  public dItem = [];
  public dQty = [];
  public dropIn = [];
  public issueCode = [];
  public issueDesc = [];
  public systemStock = [];
  public physicalStock = [];
  public variance = [];

  public loadingMask: boolean;
  public stockSummaryLoading: boolean = false;
  public showStockSummary: boolean = false;
  public stockDetailsChartLoading: boolean = false;
  public transTableLoading: boolean = false;

  //
  public shipmentL: Shipment = new Shipment();
  public pickListL: Shipment = new Shipment();
  public transactionChartData: Chart;
  public stockQtyData: StockQty[] = new Array<StockQty>();
  public transactionData = [];
  public transactionLocation = [];
  public transactionIn = [];
  public transactionOut = [];
  public auditDataList: AuditDataList[] = new Array<AuditDataList>();
  public getTransArray: any[];

  public available: number = 0;
  public unavailable: number = 0;
  public availability: string = "unavailable";
  public stQty: number = 0;
  public phQty: number = 0;
  public svaQty: number = 0;
  public newStockData: StockQty = new StockQty();
  public stQtyArray = [];
  public phQtyArray = [];
  public vaQtyArray = [];
  public stLocation = [];
  // public shipmentAll: Shipment = new Shipment();
  public shipmentAll: Shipment[] = new Array<Shipment>();
  public pickListAll: PickListDashboard[] = new Array<PickListDashboard>();
  public shipmentAll1: Shipment[] = new Array<Shipment>();

  public pickListAll1: PickListDashboard[] = new Array<PickListDashboard>();

  public stockSummaryFeedDataV;
  public shipmentList: string[];

  //stockQty
  public stockQtyFeedDataV;
  public transactionDataV;
  public auditDataV;
  fromDate: string = null;
  toDate: string = null;
  fromDate1: string = null;
  toDate1: string = null;
  fd: string = null;
  td: string = null;
  auditdata: any[];
  acceptdata: any[];
  acceptdata1: any[];
  textcolour = { "color": "black" };
  username: string = null;
  userObj: any[];
  hBatchTo: any;
  hBatchFrom: any;
  hBatchFrom1: any;
  batchProductionDtl: any[];
  allInOneChartV: WebSocket;
  public shipmentPending: Shipment = new Shipment();
  public shipmentInProgress: Shipment = new Shipment();
  public shipmentCompleted: Shipment = new Shipment();
  public pickListPending: PickListDashboard = new PickListDashboard();
  public pickListInProgress: PickListDashboard = new PickListDashboard();
  public pickListCompleted: PickListDashboard = new PickListDashboard();
  public shipmentViewModal: boolean;
  public pickListViewModal: boolean;
  public unauthorizeditemViewModal: boolean;
  public authorizeditemViewModal: boolean;

  constructor(public util: UtilService, public dashboardService: DashboardService) { }

  ngOnInit() {
    this.hBatchFrom = moment(new Date()).format('MM/DD/YYYY');
    this.hBatchTo = moment(new Date()).format('MM/DD/YYYY');

    this.fromDate = moment(this.hBatchFrom).format('YYYY-MM-DD') + "  00:00:00";
    this.toDate = moment(this.hBatchTo).format('YYYY-MM-DD') + " 23:59:59";
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // this.stockQtyFeedDataV = this.getStockQty();
    // this.getTransaction();
    // this.getTrans();
    // this.getAuditData();
    // this.getDropIn();
    // this.getAcceptCnt();

    // this.getShipmentSummary();
    // this.getPickListSummary();

  }

  filterData() {
    // let moment = require('moment'); // add this 1 of 4
    // let now = moment();
    // this.available = 0;
    // this.unavailable = 0;

    this.fromDate = moment(this.hBatchFrom).format('YYYY-MM-DD') + "  00:00:00";
    this.toDate = moment(this.hBatchTo).format('YYYY-MM-DD') + " 23:59:59";
    console.log("dddddd", this.fromDate);
    console.log("hBatchFrom", this.hBatchFrom);
    // this.getAuditData();
    // this.getTrans();
    // this.getAcceptCnt();
    // this.getShipmentSummary();
    // this.getPickListSummary();
  }

  getTransaction() {
    this.loadingMask = true;
    this.dashboardService.getTransaction().subscribe(res => {

      if (res.responseCode == 1) {

        this.transactionData = res.responseData;
        console.log("responseData>>>>>>>", this.transactionData)

        this.transactionData.forEach(element => {
          this.transactionLocation.push(element['location']);
          this.transactionIn.push(element['totalIn']);
          this.transactionOut.push(element['totalOut']);
          console.log("gggggg", element);
        });

        //this.StockChart(this.stockQtyData[0].stockQty,this.stockQtyData[0].phyQty,this.stockQtyData[0].variance)
        this.transactionChart(this.transactionLocation, this.transactionIn, this.transactionOut);
        this.loadingMask = false;
      } else {
        // this.StockChart( 0,0,0 );
        this.transactionChart(null, 0, 0);
        this.loadingMask = false;

      }

    }, error => {
    })

  }

  getDropIn() {
    this.loadingMask = true;
    this.dashboardService.getDropInChartD().subscribe(res => {
      if (res.responseCode == 1) {

        this.dropIn = res.responseData;
        console.log("responseData>>>>>>>", this.dropIn)

        this.dropIn.forEach(element => {
          this.dItem.push(element['itemId']);
          this.dQty.push(element['qty']);


        });

        this.DropBinC(this.dItem, this.dQty);

        this.loadingMask = false;

      } else {
        this.loadingMask = false;

        this.DropBinC(this.dItem, this.dQty);
      }
    }, error => {
    })
  }



  getAuditData() {
    this.loadingMask = true;

    this.dashboardService.getAuditDataList(this.fromDate, this.toDate).subscribe(res => {

      if (res.responseCode == 1) {
        this.auditdata = [];
        this.auditdata = res["responseData"];
        this.loadingMask = false;

      } else {
        this.loadingMask = false;

      }

    }, error => {
    })

  }


  // getAuditData(){

  //   this.showStockSummary = true;
  //   let me = this;
  //   var ws = new WebSocket(AppParams.WEB_SOCKET_PATH + "getItemAudit");
  //   ws.onopen = function (event) {

  //   }
  //   ws.onmessage = function (event) {

  //     let mapJson = me.util.getJsonObj(event.data)
  //     //console.log("mapJson: ", mapJson)
  //     if (mapJson['responseCode'] == 1) {

  //       let data = mapJson['responseData'];
  //       me.auditdata = data;
  //       console.log("getAuditData>>>>>>>",me.auditdata);

  //       me.showStockSummary = false;

  //     }
  //     else{
  //       console.log("getAuditData>>>>>>>",me.auditdata);
  //     }
  //   }

  //   return ws;

  // }


  getAcceptCnt() {
    this.loadingMask = true;
    this.dashboardService.getAcceptModel(this.fromDate, this.toDate).subscribe(res => {

      if (res.responseCode == 1) {
        this.acceptdata = [];

        this.acceptdata = res["responseData"];
        this.available = this.acceptdata[0].acceptedCnt;
        this.unavailable = this.acceptdata[0].unacceptedCnt;
        console.log("sadf", this.acceptdata);
        this.loadingMask = false;
      } else {
        this.loadingMask = false;

      }

    }, error => {
    })

  }

  // getAcceptCnt(fd,td) {
  //   console.log("acceptcnt",this.fromDate);
  //   console.log("fd. >>>>>>>>> ", fd);
  //   // this.filterData();
  //   let me = this;
  //   var ws = new WebSocket(AppParams.WEB_SOCKET_PATH + "getAcceptedCnt/" + this.fromDate + "/" + this.toDate);

  //   ws.onopen = function (event) {
  //   }

  //   ws.onmessage = function (event) {

  //     let mapJson = me.util.getJsonObj(event.data)
  //     //console.log("mapJson: ", mapJson)
  //     if (mapJson['responseCode'] == 1) {
  //       let data = mapJson['responseData'];
  //       console.log("data. >>>>>>>>> ", data);


  //         console.log("data.unacceptedCnt >>>>>>>>> ", data[0].unacceptedCnt);
  //         me.acceptdata = data;

  //         me.available = me.acceptdata[0].acceptedCnt;
  //         me.unavailable = me.acceptdata[0].UnacceptedCnt;

  //       // }
  //       console.log("me.acceptdata >>>>>>>>> ", me.acceptdata);
  //     } else {
  //       console.log("me.acceptdata >>>>>>>>> ", me.acceptdata);

  //     }
  //   }
  //   return ws;
  // }


  getShipmentSummaryList(status) {
    //this.dashboardService.getShipmentSummary(shipmentNo).subscribe(res => {
    this.dashboardService.getShipmentSummaryList(status, this.fromDate, this.toDate).subscribe(res => {
      if (res.responseCode == 1) {
        // this.shipmentAll[0].statusCount = 0;
        // this.shipmentAll[1].statusCount = 0;
        // this.shipmentAll[2].statusCount = 0;
        this.shipmentData = res.responseData;
        this.shipmentAll1 = res.responseData;
        // this.shipmentPending = this.shipmentAll1[0];
        // this.shipmentInProgress = this.shipmentAll1[1];
        // this.shipmentCompleted = this.shipmentAll1[2];
        //this.shipmentAll1 = res.responseData;

        console.log("shipmentAll1>>>>>>>", this.shipmentAll1)

      } else {
      }

    }, error => {
    })
  }

  getPickListSummaryList(status) {
    //this.dashboardService.getShipmentSummary(shipmentNo).subscribe(res => {
    this.dashboardService.getPickListSummaryList(status, this.fromDate, this.toDate).subscribe(res => {
      if (res.responseCode == 1) {

        this.pickListAll1 = res.responseData;

        console.log("pickListAll1>>>>>>>", this.pickListAll1)

      } else {
      }
    }, error => {
    })

  }

  // getShipmentSummary() {

  //   let me = this;
  //   var ws = new WebSocket(AppParams.WEB_SOCKET_PATH + "getShipmentSummary/" + this.fromDate + "/" + this.toDate);

  //   ws.onopen = function (event) {
  //   }

  //   ws.onmessage = function (event) {

  //     let mapJson = me.util.getJsonObj(event.data)
  //     //console.log("mapJson: ", mapJson)
  //     if (mapJson['responseCode'] == 1) {
  //       let data = mapJson['responseData'];

  //       me.shipmentAll = data;


  //       me.shipmentPending = me.shipmentAll[0];
  //       me.shipmentInProgress = me.shipmentAll[1];
  //       me.shipmentCompleted = me.shipmentAll[2];

  //       // console.log("me.shipmentAll >>>>>>>>> ",  me.shipmentAll);

  //     } else {
  //       // console.log("me.shipmentAll >>>>>>>>> ",  me.shipmentAll);
  //     }
  //   }
  //   return ws;

  // }

  // getPickListSummary() {

  //   let me = this;
  //   var ws = new WebSocket(AppParams.WEB_SOCKET_PATH + "getPickListSummary/" + this.fromDate + "/" + this.toDate);

  //   ws.onopen = function (event) {
  //   }

  //   ws.onmessage = function (event) {

  //     let mapJson = me.util.getJsonObj(event.data)
  //     //console.log("mapJson: ", mapJson)
  //     if (mapJson['responseCode'] == 1) {
  //       let data = mapJson['responseData'];

  //       me.pickListAll = data;

  //       me.pickListPending = me.pickListAll[0];
  //       me.pickListInProgress = me.pickListAll[1];
  //       me.pickListCompleted = me.pickListAll[2];

  //       // console.log("me.pickListAll >>>>>>>>> ",  me.pickListAll);

  //     } else {
  //       // console.log("me.pickListAll >>>>>>>>> ",  me.pickListAll);

  //     }
  //   }
  //   return ws;
  // }
  getShipmentSummary() {
    this.loadingMask = true;

    console.log("Inside get pick list summary");
    //this.dashboardService.getShipmentSummary(shipmentNo).subscribe(res => {
    this.dashboardService.getShipmentSummary(this.fromDate, this.toDate).subscribe(res => {
      if (res.responseCode == 1) {


        this.shipmentData = res.responseData;
        this.shipmentAll = res.responseData;

        this.shipmentPending = this.shipmentAll[0];
        this.shipmentInProgress = this.shipmentAll[1];
        this.shipmentCompleted = this.shipmentAll[2];

        console.log("pickListAll", this.shipmentAll);

        console.log("pickListData>>>>>>>", this.shipmentData)
        this.loadingMask = false;
      } else {
        this.loadingMask = false;
      }

    }, error => {
    })
  }

  getPickListSummary() {
    this.loadingMask = true;
    console.log("Inside get pick list summary");
    //this.dashboardService.getShipmentSummary(shipmentNo).subscribe(res => {
    this.dashboardService.getPickListSummary(this.fromDate, this.toDate).subscribe(res => {
      if (res.responseCode == 1) {

        this.pickListData = res.responseData;
        this.pickListAll = res.responseData;

        this.pickListPending = this.pickListAll[0];
        this.pickListInProgress = this.pickListAll[1];
        this.pickListCompleted = this.pickListAll[2];

        console.log("pickListAll", this.pickListAll);

        console.log("pickListData>>>>>>>", this.pickListData)
        this.loadingMask = false;
      } else {
        this.loadingMask = false;
      }

    }, error => {
    })
  }

  openShipmentModel(status) {
    console.log(">>>", status);
    this.shipmentViewModal = true;

    this.getShipmentSummaryList(status);

    // this.shipmentList = this.shipmentPending;
    this.shipmentData = this.shipmentAll1;


  }

  closeShipmentViewModel() {
    this.shipmentViewModal = false;
    // this.showSuccess("Mismatch Serials added Successfully!")
    //  this.getMismatchType();
  }

  openPickListModel(status) {
    console.log(">>>", status);
    this.pickListViewModal = true;

    this.getPickListSummaryList(status);

    // this.shipmentList = this.shipmentPending;
    this.shipmentData = this.pickListAll1;


  }

  closePickListViewModel() {
    this.pickListViewModal = false;
    // this.showSuccess("Mismatch Serials added Successfully!")
    //  this.getMismatchType();
  }

  // checkAvailability(){
  //   this.auditdata.forEach(element => {
  //     if(element.transit == 0){
  //       element.status = "Unavailable";
  //       this.unavailable++;
  //       this.textcolour = {"color":"black"};
  //     }else{
  //       element.status = "Available";
  //       this.available++;
  //       this.textcolour = {"color":"#A32100"};
  //     }

  //   });
  // }

  StockChart(systemStock, physicalStock, variance, location) {
    this.stockChartData = new Chart({
      colors: ['#36C9E1', '#007CBB', '#1A23A0'],
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      title: {
        style: {
          color: '#012538',
          textTransform: 'uppercase',
          fontSize: '20px'
        },
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        labels:
        {
          enabled: false
        },
        categories:
          location
        ,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Qty (Units)'
        },

        allowDecimals: false
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,


        },
        series: {
          animation: false
        }
      }

    });

  }

  transactionChart(location, totalIn, totalOut) {

    //console.log(">>>> ",stockPositionDesc)

    // args categories, allWarehousesArray, AllDistributorsArray, AllStoresArray
    this.transactionChartData = new Chart({
      colors: ['#f45b5b', '#8085e9', '#2b908f'],
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      title: {
        style: {
          color: '#012538',
          textTransform: 'uppercase',
          fontSize: '1px'
        },
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories:
          location
        ,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Qty'
        },

        allowDecimals: false
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,

      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,


        },
        series: {
          animation: {
            duration: 2000
          }
        }
      }

    });

  }


  DropBinC(dItem, dQty) {
    this.dropInChartData = new Chart({
      colors: ['#781DA0'],
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      title: {
        style: {
          color: '#012538',
          textTransform: 'uppercase',
          fontSize: '20px'
        },
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories:
          dItem
        ,
        crosshair: true
        ,
        title: {
          text: 'Parts'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Qty'
        },

        allowDecimals: false
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};' +
          '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,


        },
        series: {
          animation: {
            duration: 2000
          },
          showInLegend: false
        }
      }

    });

  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Verification } from '../models/verification';
import { StockQty } from '../models/stockQty';
import { AppParams } from '../app.module';
import { UtilService } from '../services/util.service';
import { StrategicDashboardService } from '../services/strategic-dashboard.service';
import { CubejsClient } from '@cubejs-client/ngx';
import { PhysicalIssues } from '../models/physicalissues';
import { ToastrService } from 'ngx-toastr';

import { Subject } from 'rxjs';
// import { StrategicDashboardService } from 'app/services/strategic-dashboard.service';
let globMe = this;
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color } from 'ng2-charts';
// import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
// import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd/i18n';
import * as moment from 'moment';
import { analyzeAndValidateNgModules } from '@angular/compiler';


import { Getmismatch } from '../models/mismatch';
import { MismatchService } from '../services/mismatch.service';




@Component({
  selector: 'app-strategic-dashboard',
  templateUrl: './strategic-dashboard.component.html',
  styleUrls: ['./strategic-dashboard.component.scss'],
  providers: [StrategicDashboardService, MismatchService]


})
export class StrategicDashboardComponent implements OnInit {

  constructor(private cubejs: CubejsClient, public util: UtilService, public strategicDashboardService: StrategicDashboardService, public mismatchService: MismatchService, public toastr: ToastrService) {
    // , private i18n: NzI18nService
  }
  fromDate: string = null;
  toDate: string = null;

  ngOnInit() {

    this.issueDateFrom = moment(new Date()).format('YYYY-MM-DD') + " 00:00:00";
    this.issueDateTo = moment(new Date()).format('YYYY-MM-DD') + " 23:59:59";
    this.getMismatchArray = new Array();
    // this.getMismatchArray;
    this.getPhysicalInsGRN('2019-08-09','2019-12-09');
    this.getPhysicalIns('2019-08-09','2019-12-09');
    // this.getLastStockVerification();
    this.physicalIssues(this.issueDateFrom, this.issueDateTo);
    this.getIssueGRNIns();
    this.issueChartType = "issueChart";
    this.getIssueChart();
    this.stockByItem();
    this.stockByLocation();
    this.stockByCategory();
    this.lastStockVerification();
    this.varChartType = "verChart";
    this.lastStockVerificationDrillDown();


  }

  showSuccess(message) {
    this.toastr.success(message, 'Info!');
  }
  showError(message) {
    this.toastr.error(message, 'Oops!');
  }


  public ws: any;
  public StockVerification: Verification = new Verification();
  public newStockData: StockQty = new StockQty();
  public stQtyArray = [];
  public phQtyArray = [];
  public vaQtyArray = [];
  public verOriginalQty: any;
  public verCountedQty: any;
  public verDesc: any;
  public verDrillDownOriginalQty = [];
  public verDrillDownCountedQty = [];
  public verDrillDownDesc = [];
  public serialNo = [];
  public stockByStoreLocation = [];
  public stockByStoreQty = [];
  public stockByCategoryPhyQty = [];
  public stockByCategorySysQty = [];
  public stockByCategoryCategory = [];
  public chartType: String;
  public val: String;
  public dataSetIndex: String;
  public colVal: String;
  public varChartType: String;
  public issueChartType: String;
  public datePick: any;
  public issueItemID = [];
  public issueQty = [];
  public issueLocation = [];
  public issueByCategoryQty = [];
  public issueByCategoryItemID = [];
  public issueByCategoryItemDesc = [];
  public issueDate: any;
  public issueDateFrom: any;
  public issueDateTo: any;
  public physicalInsDateFrom: any;
  public physicalInsDateTo: any;
  // public physicalGRNInsQty = [];
  // public physicalInsQty = [];
  public physicalGRNInsQty: any ;
  public physicalInsQty: any;
  public issueByStoreQty = [];
  public issueByStoreLocation = [];
  public issueChartClickedVal: any;
  public issueChartDrillDownClickedVal: any;
  public issueByCategoryLocation: any;
  public issueByCategoryLocationDrillDown: any;

  public me = this;
  public data;
  public issueItemArray: PhysicalIssues[] = new Array<PhysicalIssues>();
  public barChartOptionsForStockVerification: any;
  public barChartOptionsForStockVerificationDrillDown: any;
  public barChartOptionsForIssue: any;
  public barChartOptionsForIssueLocation: any;
  public barChartOptionsForIssueGRNIns: any;

  public var1: String;


  public IssueModal: boolean;
  // public issueItemArray: any[];

  date = null;
  dateRange: Date;
  isEnglish = false;

  ///////////////////////////////////Mismatch//////////////////////////////////////

  public editMode: boolean;

  public changeMismatchModal: boolean;
  public editQtyModal: boolean;
  public MismatchList: Getmismatch[] = new Array<Getmismatch>();
  public changeMismatch = new Getmismatch();
  public GetmismatchSerial = new Getmismatch();
  public MismatchFinal = new Getmismatch();
  public getMismatchArray: any[];
  public getMismatchSerialArray: any[];
  public MismatchFinalArray: any[];
  public stockAdjustmentmodal: boolean;

  //public getMismatchRemoveSerialArray : any[];
  public loadingMask: boolean;
  itemId: String;
  serial: String;
  qty: number;

  ////////////////////////////////////////////////////////////////////////////////////////

  onChange(result: Date): void {
    this.datePick = result;
    console.log('datePick: ', this.datePick[0]);

    this.issueDateFrom = moment(this.datePick[0]).format('YYYY-MM-DD');
    this.issueDateTo = moment(this.datePick[1]).format('YYYY-MM-DD');

    console.log('issueDateFrom: ', this.issueDateFrom);
    console.log('issueDateTo: ', this.issueDateTo);

    this.physicalIssues(this.issueDateFrom, this.issueDateTo);

  }


  public chartClicked(click: any): void {
    console.log(click);
    this.val = click.active[0]._view.label;
    console.log(">>>>>>>val>>>> = ", this.val);
  }

  public getColumnData(evt) {
    console.log("Click event >>>> ", evt)
  }

  // demoCube1(){
  //   // this.query1 = new Subject();

  //   this.cubejs.watch(this.query1).subscribe(
  //     resultSet => {
  //       console.log(resultSet.chartPivot()[0].x);
  //       console.log(resultSet.seriesNames()[0]);
  //       console.log(resultSet);
  //     },
  //     err => console.log('HTTP Error', err)
  //   );

  // }

  ////////////////////////////////Stock Details/////////////////////////////////////////

  stockByItem() {

    this.chartType = 'item';

    console.log("ChartType>>>>>>>>>>>>>>>>>>>>>", this.chartType);

    this.cubejs.load({
      "measures": [
        "Stock.sysqty",
        "Stock.phyqty"
      ],
      "timeDimensions": [],
      "dimensions": [
        "Stock.serial"
      ],
      "filters": []
    }).subscribe(
      resultSet => {
        this.data = resultSet.chartPivot();

        this.data.forEach(ele => {

          this.phQtyArray.push(ele['Stock.phyqty']);
          this.stQtyArray.push(ele['Stock.sysqty']);
          this.serialNo.push(ele['category']);
        }
        )

        this.phQtyArray = [];
        this.stQtyArray = [];
        this.serialNo = [];

      },
      err => console.log('HTTP Error', err)
    );

  }

  stockByLocation() {

    this.chartType = 'store';
    console.log("ChartType>>>>>>>>>>>>>>>>>>>>>", this.chartType);

    this.cubejs.load({
      "measures": [
        "StockByStore.qty"
      ],
      "timeDimensions": [],
      "dimensions": [
        "StockByStore.location"
      ],
      "filters": []
    }).subscribe(
      resultSet => {
        this.data = resultSet.chartPivot();
        this.data.forEach(ele => {

          this.stockByStoreLocation.push(ele['x']);
          this.stockByStoreQty.push(ele['StockByStore.qty']);

        }
        )
        this.stockByStoreLocation = [];
        this.stockByStoreQty = [];

      },
      err => console.log('HTTP Error', err)
    );

  }


  stockByCategory() {

    this.chartType = 'category';
    console.log("ChartType>>>>>>>>>>>>>>>>>>>>>", this.chartType);

    this.cubejs.load({
      "measures": [
        "StockByCategory.sysQty",
        "StockByCategory.phyQty"
      ],
      "timeDimensions": [],
      "dimensions": [
        "StockByCategory.category"
      ],
      "filters": []
    }).subscribe(
      resultSet => {
        this.data = resultSet.chartPivot();
        this.data.forEach(ele => {

          this.stockByCategorySysQty.push(ele['StockByCategory.sysQty']);
          this.stockByCategoryPhyQty.push(ele['StockByCategory.phyQty']);
          this.stockByCategoryCategory.push(ele['category']);

        }
        )

        this.stockByCategorySysQty = [];
        this.stockByCategoryPhyQty = [];
        this.stockByCategoryCategory = [];

      },
      err => console.log('HTTP Error', err)
    );

  }


  ////////////////////////////////Verifications/////////////////////////////////////////


  lastStockVerification() {

    this.chartType = 'item';

    console.log("ChartType>>>>>>>>>>>>>>>>>>>>>", this.chartType);

    this.cubejs.load({
      "measures": [
        "Verification.originalQty",
        "Verification.countedQty"
      ],
      "timeDimensions": [],
      "dimensions": [
        "Verification.desc"
      ],
      "filters": []
    }).subscribe(
      resultSet => {
        this.data = resultSet.chartPivot();

        this.data.forEach(ele => {

          this.verOriginalQty = ele['Verification.originalQty'];
          this.verCountedQty = ele['Verification.countedQty'];
          this.verDesc = ele['category'];
          console.log("demoCube>>>>>>>>>>>>>", this.data);
          console.log("verOriginalQty>>>>>>>>>>>>>", this.verOriginalQty);
          console.log("verCountedQty>>>>>>>>>>>>>", this.verCountedQty);
          console.log("verDesc>>>>>>>>>>>>>", this.verDesc);

          this.getVerChart();
        }
        )
        // this.verOriginalQty = [];
        // this.verCountedQty = [];
        // this.verDesc = [];

      },
      err => console.log('HTTP Error', err)
    );

  }


  lastStockVerificationDrillDown() {

    console.log("ChartType>>>>>>>>>>>>>>>>>>>>>", this.chartType);

    this.cubejs.load({
      "measures": [
        "VerificationDrillDown.originalQty",
        "VerificationDrillDown.countedQty"
      ],
      "timeDimensions": [],
      "dimensions": [
        "VerificationDrillDown.itemID"
      ],
      "filters": []
    }).subscribe(
      resultSet => {
        this.data = resultSet.chartPivot();

        this.data.forEach(ele => {

          this.verDrillDownOriginalQty.push(ele['VerificationDrillDown.originalQty']);
          this.verDrillDownCountedQty.push(ele['VerificationDrillDown.countedQty']);
          this.verDrillDownDesc.push(ele['category']);

        }
        )
      },
      err => console.log('HTTP Error', err)
    );

  }


  public verChartClicked(click: any): void {

    this.varChartType = "verDrillDown";
    console.log("hahahahahahah", this.verDrillDownOriginalQty);
    this.getVerDrillDownChart()

  }

  ////////////////////////////////Physical Issues/////////////////////////////////////////

  physicalIssues(fromDate, toDate) {

    this.issueDateFrom = fromDate;
    this.issueDateTo = toDate;

    this.cubejs.load({

      "measures": [
        "PhysicalIssues.qty"

      ],
      "timeDimensions": [
        {
          "dimension": "PhysicalIssues.date"
        }
      ],
      "dimensions": [
        // "PhysicalIssues.itemID",
        "PhysicalIssues.location",
        // "PhysicalIssues.date"
      ],
      "filters": [

        {
          member: "PhysicalIssues.date",
          operator: "inDateRange",
          values: [this.issueDateFrom, this.issueDateTo]
        }

      ]

    }).subscribe(
      resultSet => {

        this.data = resultSet.chartPivot();
        console.log("lalalalalaldemoCube>>>>>>>>>>>>>", this.data);

        this.issueQty = [];
        this.issueItemID = [];
        this.issueLocation = [];

        this.data.forEach(ele => {

          this.issueQty.push(ele['PhysicalIssues.qty']);
          this.issueItemID.push(ele['PhysicalIssues.itemID']);
          this.issueLocation.push(ele['category']);

          console.log("lalalalalaldemoCube>>>>>>>>>>>>>", this.data);
          console.log("issueQty>>>>>>>>>>>>>", this.issueQty);
          console.log("issueItemID>>>>>>>>>>>>>", this.issueItemID);
          console.log("issueLocation>>>>>>>>>>>>>", this.issueLocation);

          this.getIssueChart();

        }
        )

      },
      err => console.log('HTTP Error', err)
    );

  }


  getPhysicalIssuesByCategory(fromDate, toDate, location) {

    this.issueDateFrom = fromDate;
    this.issueDateTo = toDate;
    this.issueByCategoryLocation = location;

    this.cubejs.load({
      "measures": [
        "PhysicalIssues.qty"

      ],
      "timeDimensions": [
        {
          "dimension": "PhysicalIssues.date"
        }
      ],
      "dimensions": [
        "PhysicalIssues.itemDesc"
      ],
      "filters": [
        {
          member: "PhysicalIssues.date",
          operator: "inDateRange",
          values: [this.issueDateFrom, this.issueDateTo]
        },
        {
          "dimension": "PhysicalIssues.location",
          "operator": "equals",
          "values": [
            this.issueByCategoryLocation
          ]
        }

      ]
    }).subscribe(
      resultSet => {
        this.data = resultSet.chartPivot();

        // this.stQtyArray = this.data.category;
        this.data.forEach(ele => {

          this.issueByCategoryQty.push(ele['PhysicalIssues.qty']);
          this.issueByCategoryItemDesc.push(ele['category']);
        }
        )
        console.log("demoCube>>>>>>>>>>>>>", this.data);
        console.log("issueByCategoryQty>>>>>>>>>>>>>", this.issueByCategoryQty);
        console.log("issueByCategoryItemDesc>>>>>>>>>>>>>", this.issueByCategoryItemDesc);
        this.phQtyArray = [];
        this.stQtyArray = [];
        this.serialNo = [];

      },
      err => console.log('HTTP Error', err)
    );
  }


  getPhysicalIssuesByCategoryDrillDown(fromDate, toDate, category) {

    this.issueDateFrom = fromDate;
    this.issueDateTo = toDate;
    this.issueByCategoryLocationDrillDown = category;

    console.log("issueDateFrom", this.issueDateFrom);
    console.log("issueDateTo", this.issueDateTo);
    console.log("issueByCategoryLocationDrillDown", this.issueByCategoryLocationDrillDown);
    console.log("this.issueByCategoryLocation", this.issueByCategoryLocation);

    this.strategicDashboardService.getPhysicalIssueItems(this.issueDateFrom, this.issueDateTo, this.issueByCategoryLocationDrillDown, this.issueByCategoryLocation).subscribe(res => {

      if (res.responseCode == 1) {
        this.issueItemArray = res.responseData;
        console.log("issueItemArray>>>>>>>>>>>>>>>>>>>", this.issueItemArray);
        this.IssueModal = true;
      } else {
        console.log(">>>>>>>>>>>>>>>>>>>else", this.issueItemArray);
      }

    }, error => {
      console.log("error");

    })


    // this.cubejs.load({
    //   "measures": [
    //     "PhysicalIssues.qty"

    //   ],
    //   "timeDimensions": [
    //     {
    //       "dimension": "PhysicalIssues.date"
    //     }
    //   ],
    //   "dimensions": 

    //   [

    //     "PhysicalIssues.itemID",
    //     // "PhysicalIssues.location",
    //     // "PhysicalIssues.serial"

    //   ],
    //   "filters": [
    //     {
    //       member: "PhysicalIssues.date",
    //       operator: "inDateRange",
    //       values: [this.issueDateFrom, this.issueDateTo]
    //     },
    //     {
    //       "dimension": "PhysicalIssues.location",
    //       "operator": "equals",
    //       "values": [
    //         this.issueByCategoryLocation
    //       ]
    //     },
    //     {
    //       "dimension": "PhysicalIssues.itemDesc",
    //       "operator": "equals",
    //       "values": [
    //         this.issueByCategoryLocationDrillDown
    //       ]
    //     }

    //   ]
    // }).subscribe(
    //   resultSet => {
    //     this.data = resultSet.chartPivot();
    //     // this.issueItemArray = this.data;
    //     var i = 1;
    //     console.log("issueItemArray>>>>>>>>>>>>>", this.data);
    //     this.data.forEach(ele => {
    //         var index = i++;
    //         console.log("index :: ", ele)
    //         this.issueItemArray[index]["PhysicalIssues.qty"] = ele['PhysicalIssues.qty'];
    //         this.issueItemArray[index].itemID = ele['category'];
    //       }

    //     // issueItemArray
    //       // this.issueItemArray.push(ele['PhysicalIssues.qty']);
    //       // this.issueItemArray.push(ele['category']);
    //     )
    //     console.log("demoCube>>>>>>>>>>>>>", this.data);
    //     // this.issueItemArray = this.data;
    //     console.log("issueItemArray>>>>>>>>>>>>>", this.issueItemArray);
    //     this.IssueModal = true;

    //     // console.log("issueByCategoryQty>>>>>>>>>>>>>", this.issueByCategoryQty);
    //     // console.log("issueByCategoryItemDesc>>>>>>>>>>>>>", this.issueByCategoryItemDesc);
    //     // this.phQtyArray = [];
    //     // this.stQtyArray = [];
    //     // this.serialNo = [];

    //   },
    //   err => console.log('HTTP Error', err)
    // );
  }

  // public issueChartClicked(click: any): void {
  public issueChartClicked(location) {

    this.issueChartClickedVal = location;
    this.getPhysicalIssuesByCategory(this.issueDateFrom, this.issueDateTo, this.issueChartClickedVal);
    this.issueChartType = "issueDrillDown";
    console.log("hahahahahahah", this.issueChartClickedVal);
    this.getIssueByLocationChart()

  }


  public issueChartDrillDownClicked(category) {

    this.issueChartDrillDownClickedVal = category;
    this.getPhysicalIssuesByCategoryDrillDown(this.issueDateFrom, this.issueDateTo, this.issueChartDrillDownClickedVal);
    // this.issueChartType = "issueDrillDown";
    // console.log("hahahahahahah", this.issueChartDrillDownClickedVal);
    // this.getIssueByLocationChart()

  }



  //////////////////////////////////   Physical INs   //////////////////////////////////////////

  getPhysicalInsGRN(fromDate, toDate) {

    this.physicalInsDateFrom = fromDate;
    this.physicalInsDateTo = toDate;
    // this.issueByCategoryLocation = location;

    this.cubejs.load({
      "measures": [
        "M999phytx.pxTxQty"

      ],
      "timeDimensions": [
        {
          "dimension": "M999phytx.pxDate"
        }
      ],
      "dimensions": [
        "M999phytx.itemDesc"
      ],
      "filters": [
        {
          member: "M999phytx.pxDate",
          operator: "inDateRange",
          values: [this.physicalInsDateFrom, this.physicalInsDateTo]
        },
        {
          "dimension": "M999phytx.pxType",
          "operator": "equals",
          "values": [
            '3'
          ]
        }

      ]
    }).subscribe(
      resultSet => {
        this.data = resultSet.chartPivot();

        // this.stQtyArray = this.data.category;
        this.data.forEach(ele => {

          this.physicalGRNInsQty = ele['M999phytx.pxTxQty'];
          // this.issueByCategoryItemDesc.push(ele['category']);
        }
        )
        console.log("demoCube>>>>>>>getPhysicalInsGRN>>>>>>", this.data);
        console.log("issueByCategoryQty>>>>>>>>>>>>>", this.physicalGRNInsQty);
        // console.log("issueByCategoryItemDesc>>>>>>>>>>>>>", this.issueByCategoryItemDesc);
        // this.physicalGRNInsQty = [];


      },
      err => console.log('HTTP Error', err)
    );
  }


  getPhysicalIns(fromDate, toDate) {

    this.physicalInsDateFrom = fromDate;
    this.physicalInsDateTo = toDate;
    // this.issueByCategoryLocation = location;

    this.cubejs.load({
      "measures": [
        "M999phytx.pxTxQty"

      ],
      "timeDimensions": [
        {
          "dimension": "M999phytx.pxDate"
        }
      ],
      "dimensions": [
        "M999phytx.itemDesc"
      ],
      "filters": [
        {
          member: "M999phytx.pxDate",
          operator: "inDateRange",
          values: [this.physicalInsDateFrom, this.physicalInsDateTo]
        },
        {
          "dimension": "M999phytx.pxType",
          "operator": "equals",
          "values": [
            '1'
          ]
        }

      ]
    }).subscribe(
      resultSet => {
        this.data = resultSet.chartPivot();

        // this.stQtyArray = this.data.category;
        this.data.forEach(ele => {

          this.physicalInsQty = ele['M999phytx.pxTxQty'];
          // this.issueByCategoryItemDesc.push(ele['category']);
        }
        )
        console.log("demoCube>>>>getPhysicalIns>>>>>>>>>", this.data);
        console.log("physicalInsQty>>>>>>>>>>>>>", this.physicalInsQty);
        // console.log("issueByCategoryItemDesc>>>>>>>>>>>>>", this.issueByCategoryItemDesc);
        // this.physicalInsQty = [];
        // this.stQtyArray = [];
        // this.serialNo = [];

      },
      err => console.log('HTTP Error', err)
    );
  }



  ////////// Charts For Stock By Item////////////////////////////////////////////////////////////

  // public barChartOptionsForStock: ChartOptions = {
  public barChartOptionsForStock: ChartOptions = {

    responsive: true,
    responsiveAnimationDuration: 2000,
    events: ['click'],

    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }

  };

  public barChartLabelsForStock: Label[] = this.serialNo;
  public barChartTypeForStock: ChartType = 'bar';
  public barChartLegendForStock = true;
  public barChartDataForStock: ChartDataSets[] = [
    { data: this.stQtyArray, label: 'System Qty', backgroundColor: '#1ab394', borderColor: '#1ab394', hoverBackgroundColor: '#148f76', hoverBorderColor: '#148f76' },
    { data: this.phQtyArray, label: 'Stock Qty', backgroundColor: '#0095D3', borderColor: '#0095D3', hoverBackgroundColor: '#0086BD', hoverBorderColor: '#0086BD' }
  ];



  ////////// Charts For Stock By Category////////////////////////////////////////////////////////////

  public barChartOptionsForStockCategory: ChartOptions = {
    responsive: true,
    responsiveAnimationDuration: 2000,

    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }

      }], yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabelsForStockCategory: Label[] = this.stockByCategoryCategory;
  public barChartTypeForStockCategory: ChartType = 'bar';
  public barChartLegendForStockCategory = true;
  public barChartDataForStockCategory: ChartDataSets[] = [
    { data: this.stockByCategorySysQty, label: 'System Qty', backgroundColor: '#1ab394', borderColor: '#1ab394', hoverBackgroundColor: '#148f76', hoverBorderColor: '#148f76' },
    { data: this.stockByCategoryPhyQty, label: 'Stock Qty', backgroundColor: '#0095D3', borderColor: '#0095D3', hoverBackgroundColor: '#0086BD', hoverBorderColor: '#0086BD' }
  ];


  ////////// Charts For Stock By Location////////////////////////////////////////////////////////////

  public barChartOptionsForStockLocation: ChartOptions = {
    responsive: true,
    responsiveAnimationDuration: 2000,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }

      }], yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }]
    },

    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabelsForStockLocation: Label[] = this.stockByStoreLocation;
  public barChartTypeForStockLocation: ChartType = 'bar';
  public barChartLegendForStockLocation = true;
  public barChartDataForStockLocation: ChartDataSets[] = [
    { data: this.stockByStoreQty, label: 'Stock Qty', backgroundColor: '#0095D3', borderColor: '#0095D3', hoverBackgroundColor: '#0086BD', hoverBorderColor: '#0086BD' }
  ];


  ////////// Charts For Last Stock Verification////////////////////////////////////////////////////////////

  getVerChart() {
    let me = this;
    setTimeout(() => {
      // public barChartOptionsForStockVerification : ChartOptions = {
      this.barChartOptionsForStockVerification = new Chart('barChartOptionsForStockVerification', {
        type: 'bar',
        options: {
          responsive: true,
          maintainAspectRatio: false,

          scales: {
            xAxes: [{
              gridLines: {
                display: false
              }

            }], yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }]
          },

          // onClick: function(e){ console.log(e);var activeElement = this.getElementAtEvent(e);console.log("lala",activeElement);  }
          onClick: function (e) {

            var element = this.getElementAtEvent(e);

            if (element.length) {

              console.log("eeeeeeeeeeeeeeeeeeeeeeeee", this.getElementAtEvent(e));

              var clickedElementindex = element[0]["_index"];
              if (clickedElementindex == 0) {

                me.colVal = element[0]._view.datasetLabel;
                console.log("lala1", me.colVal);
                me.verChartClicked(me.colVal);

              } else if (clickedElementindex == 1) {

                me.colVal = element[0]._view.label;
                console.log("lala", me.colVal);
                me.verChartClicked(me.colVal);
              }
            }
          }
        },

        data: {
          datasets: [
            {
              label: "Stock Qty",
              backgroundColor: "#004A70",
              data: [this.verOriginalQty]
            }, {
              label: "Counted Qty",
              backgroundColor: "#009CBF",
              data: [this.verCountedQty]
            }

          ],
          labels: [this.verDesc]
        }
      });
    }, 1000);
  }


  /////////////////////////////////Verification DrillDown Chart/////////////////////////////////////////////////

  getVerDrillDownChart() {
    let me = this;
    setTimeout(() => {

      this.barChartOptionsForStockVerificationDrillDown = new Chart('barChartOptionsForStockVerificationDrillDown', {
        type: 'bar',
        options: {
          responsive: true,
          maintainAspectRatio: false,

          scales: {
            xAxes: [{
              gridLines: {
                display: false
              }

            }], yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }]
          },

        },

        data: {
          datasets: [
            {
              label: "Stock Qty",
              backgroundColor: "#004A70",
              data: this.verDrillDownOriginalQty
            }, {
              label: "Counted Qty",
              backgroundColor: "#009CBF",
              data: this.verDrillDownCountedQty
            }

          ],
          labels: this.verDrillDownDesc
        }
      });
    }, 1000);
  }


  ////////////////////////////get Issue Chart//////////////////////////////////////

  getIssueChart() {
    let me = this;
    setTimeout(() => {
      this.barChartOptionsForIssue = new Chart('barChartOptionsForIssue', {
        type: 'bar',
        options: {
          responsive: true,
          maintainAspectRatio: false,

          scales: {
            xAxes: [{
              gridLines: {
                display: false
              }

            }], yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }]
          },

          onClick: function (e) {

            var element = this.getElementAtEvent(e);

            if (element.length) {

              console.log("eeeeeeeeeeeee111eeeeeeeeeeee", this.getElementAtEvent(e));

              var clickedElementindex = element[0]["_index"];
              // if (clickedElementindex == 0) {

              me.colVal = element[0]._view.label;
              console.log("lala1", me.colVal);
              me.issueChartClicked(me.colVal);
              // } else if (clickedElementindex == 1) {

              //   me.colVal = element[0]._view.label;
              //   console.log("lala", me.colVal);
              //   me.verChartClicked(me.colVal);
              // }
            }
          }
        },

        data: {
          datasets: [
            {
              label: "Qty",
              backgroundColor: "#8939AD",
              data: this.issueQty
            }

          ],
          labels: this.issueLocation
        }
      });
    }, 1000);
  }



  getIssueByLocationChart() {
    console.log("Inside issueLoc Chart");
    let me = this;
    setTimeout(() => {
      this.barChartOptionsForIssueLocation = new Chart('barChartOptionsForIssueLocation', {
        type: 'bar',
        options: {
          responsive: true,
          maintainAspectRatio: false,

          scales: {
            xAxes: [{
              gridLines: {
                display: false
              }

            }], yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }]
          },

          onClick: function (e) {

            var element = this.getElementAtEvent(e);

            if (element.length) {

              console.log("eeeeeeeeeeee2222eeeeeeeeeeeee", this.getElementAtEvent(e));

              var clickedElementindex = element[0]["_index"];
              me.colVal = element[0]._view.label;
              console.log("lala1", me.colVal);
              me.issueChartDrillDownClicked(me.colVal);

            }
          }
        },

        data: {
          datasets: [
            {
              label: "Qty",
              backgroundColor: "#8939AD",
              data: this.issueByCategoryQty
            }

          ],
          labels: this.issueByCategoryItemDesc
        }
      });
    }, 1000);
  }

    ////////////////////////////      Issue GRN/Ins Charts    //////////////////////////////////////

    getIssueGRNIns() {

      let me = this;
      setTimeout(() => {
        this.barChartOptionsForIssueGRNIns = new Chart('barChartOptionsForIssueGRNIns', {
          type: 'bar',
          options: {
            responsive: true,
            maintainAspectRatio: false,
  
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                }
  
              }], yAxes: [{
                ticks: {
                  beginAtZero: true
                },
                gridLines: {
                  display: false
                }
              }]
            },
  
            // onClick: function (e) {
  
            //   var element = this.getElementAtEvent(e);
  
            //   if (element.length) {
  
            //     console.log("eeeeeeeeeeee2222eeeeeeeeeeeee", this.getElementAtEvent(e));
  
            //     var clickedElementindex = element[0]["_index"];
            //     me.colVal = element[0]._view.label;
            //     console.log("lala1", me.colVal);
            //     me.issueChartDrillDownClicked(me.colVal);
  
            //   }
            // }
          },
  
          data: {
            datasets: [
              {
                label: "Qty",
                backgroundColor: "#314351",
                data: [this.physicalGRNInsQty,this.physicalInsQty]
              }
   
            ],
            labels: ['GRN','Physical Ins']
          }
        });
      }, 1000);
    }

  /////////////////////////////////////////////////////////////////////////////////////////////////////


  closeIssueModal() {
    this.IssueModal = false;

  }

  ////////////////////////////////////Mismatch////////////////////////////////////////////////


  getItemByGRNno(grnNo) {

    this.mismatchService.getMismatchDatabyGRNno(grnNo).subscribe(res => {

      if (res.responseCode == 1) {
        this.getMismatchArray;
        this.getMismatchArray = res["responseData"];

        if (this.getMismatchArray.length != 0) {

        console.log("getMismatchArray>>>>>>>> ", this.getMismatchArray)
        this.stockAdjustmentmodal = true;

        }else{
          this.getMismatchArray.push(999);
          console.log("getMismatchArray of getItemByItemID inside else>>>>>>>> ", this.getMismatchArray)

        }
        // this.loadingMask = false;
      } else {

      }
    }, error => {
      // this.loadingMask = false;
    });
  }

  getItemByItemID(itemId) {

    this.mismatchService.getMismatchSerial(itemId).subscribe(res => {

      if (res.responseCode == 1) {

        // if(res.responseData != null){

        this.getMismatchArray;
        this.getMismatchArray = res["responseData"];

        if (this.getMismatchArray.length != 0) {

          console.log("getMismatchArray of getItemByItemID>>>>>>>> ", this.getMismatchArray)
          this.stockAdjustmentmodal = true;
        } 
        else {

          this.getMismatchArray.push(999);
          console.log("getMismatchArray of getItemByItemID inside else>>>>>>>> ", this.getMismatchArray)

        }

        // }else{
        //   this.getMismatchArray.push(999);
        //   console.log("getMismatchArray of getItemByItemID inside else>>>>>>>> ", this.getMismatchArray)

        // }

        // this.loadingMask = false;
      } else {
        // this.getMismatchArray.push(999);
      }
    }, error => {
      // this.loadingMask = false;
    });

  }

  openChangeAdjustmentModal(payload) {

    this.getMismatchArray;
    this.getMismatchSerialArray;

    this.changeMismatchModal = true;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", this.getMismatchArray);
    //  this.getMismatchType();

    this.changeMismatch = payload;
    this.GetmismatchSerial;
    this.getItemByItemID(this.itemId);
    this.itemId = this.changeMismatch.itemId;
    this.serial = this.changeMismatch.serial;
    // this.serial = this.GetmismatchSerial.serial;

    //  console.log("iiiiiteemmmmmmmmmmmm",this.itemId);
    //  console.log("seeeerrrriaaal",this.serial);
    this.getMismatchSerial();

  }

  getMismatchSerial() {
    // this.itemId = this.getMismatchArray[0];

    this.mismatchService.getMismatchSerial(this.itemId).subscribe(res => {
      console.log("itemId>>>>>>>>>>>>> ", this.itemId);
      if (res.responseCode == 1) {
        this.getMismatchSerialArray;
        this.getMismatchSerialArray = res["responseData"];
        console.log("getMismatchSerialArray ", this.getMismatchSerialArray)
      } else {

      }
    }, error => {

    });

  }

  addSerial(mode, payload) {
    if (payload.serial != "") {
      this.GetmismatchSerial = payload;
      this.serial = this.GetmismatchSerial.serial;
      this.GetmismatchSerial.type = this.changeMismatch.type;
      this.GetmismatchSerial.itemId = this.changeMismatch.itemId;
      // this.GetmismatchSerial.qty = this.changeMismatch.qty;

      console.log("GetmismatchSerial>>>>>>>>>>>>>>>>>> ", this.GetmismatchSerial);

      //this.MismatchList=this.getMismatchSerialArray;

      //this.getMismatchSerialArray.push(this.GetmismatchSerial);
      console.log("getMismatchSerialArray>>>>>>>", this.getMismatchSerialArray);
      console.log("MismatchList>>>>>>>", this.MismatchList);

      this.MismatchFinal = this.GetmismatchSerial;

      this.mismatchService.addSerial(this.MismatchFinal).subscribe(res => {
        console.log("addSerial ", res)
        console.log("GetmismatchSerial>>>>>>>>>>>>>>>>>> ", this.MismatchFinal);

        // if (res['responseCode'] == 1) {
        //   this.showSuccess(res['responseData'])

        // } else {
        //   this.showError(res['responseData'])
        // }
        this.getMismatchSerialArray;
        this.getMismatchSerialArray = res["responseData"];
        // getMismatchRemoveSerialArray
        console.log("getMismatchSerialArray+++++ ", this.getMismatchSerialArray);
        this.getMismatchSerial();
        this.GetmismatchSerial.serial = null;
        this.GetmismatchSerial.qty = 0;
        this.loadingMask = false;
        this.showSuccess("Serial Number Added Successfully!")
      }, error => {
        this.loadingMask = false;
        this.showError(error)
      });
    } else {
      this.showError("Insert serial number");
    }
  }

  removeSerial(mode, payload){

    this.GetmismatchSerial = payload;
    console.log("remove>>>>GetmismatchSerial>>>>>>>>>>>>> ",  this.GetmismatchSerial);

    this.mismatchService.removeSerial(this.GetmismatchSerial).subscribe(res =>{
    //  if(res.responseCode==1){
        
      // }else{

      // }
        this.getMismatchSerialArray;
        this.getMismatchSerialArray = res["responseData"];
        console.log("getMismatchSerialArray ",  this.getMismatchSerialArray);
         this.getMismatchSerial();
    
      this.changeMismatchModal = true;
      
      this.getMismatchType();
      this.GetmismatchSerial.serial=null;
      this.GetmismatchSerial.qty=null;
     this.loadingMask = false;
     this.showSuccess("Serial Number Removed Successfully!")
    }, error =>{
      this.loadingMask = false;
      this.showError(error)
    });

  }

  saveStockQty(payload) {
    console.log("PAYLOAD>>>>>>>>>>>>>>>>>> ", payload);
    this.GetmismatchSerial = payload;
    this.serial = this.GetmismatchSerial.serial;
    //this.GetmismatchSerial.qty;
    this.GetmismatchSerial.type = this.changeMismatch.type;
    this.GetmismatchSerial.itemId = this.changeMismatch.itemId;
    this.GetmismatchSerial.qty = this.changeMismatch.qty;

    console.log("GetmismatchSerial>>>>>>>>>>>>>>>>>> ", this.GetmismatchSerial);

    console.log("getMismatchSerialArray>>>>>>>", this.getMismatchSerialArray);
    console.log("MismatchList>>>>>>>", this.MismatchList);

    this.MismatchFinal = this.GetmismatchSerial;

    this.mismatchService.UpdateMismatchQty(this.MismatchFinal).subscribe(res => {
      console.log("StockQty ", res)
      console.log("GetmismatchSerial>>>>>>>>>>>>>>>>>> ", this.MismatchFinal);

      // if (res['responseCode'] == 1) {
      //   this.showSuccess(res['responseData'])

      // } else {
      //   this.showError(res['responseData'])
      // }
      this.getMismatchSerialArray;
      this.getMismatchSerialArray = res["responseData"];
      // getMismatchRemoveSerialArray
      console.log("getMismatchSerialArray ", this.getMismatchSerialArray);
      this.getMismatchSerial();
      this.GetmismatchSerial.serial = null;
      // this.GetmismatchSerial.qty=0;
      this.loadingMask = false;
      this.editQtyModal = false;
      this.showSuccess("Stock Qty Updated Successfully!")
    }, error => {
      this.loadingMask = false;
      this.editQtyModal = false;

      this.showError(error)
    });

  }


  onEdit(payload) {

    this.editQtyModal = true;
    this.getMismatchArray;
    this.getMismatchSerialArray;

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", this.getMismatchArray);
    this.getMismatchType();
    this.GetmismatchSerial = payload;
    this.changeMismatch = payload;
    this.GetmismatchSerial;
    this.itemId = this.changeMismatch.itemId;
    this.serial = this.changeMismatch.serial;
    // this.serial = this.GetmismatchSerial.serial;

    //  console.log("iiiiiteemmmmmmmmmmmm",this.itemId);
    //  console.log("seeeerrrriaaal",this.serial);
    this.getMismatchSerial();


  }


  saveMismatchdata() {
    this.mismatchService.removeSerial(this.MismatchFinal).subscribe(res => {
      //  if(res.responseCode==1){

      // }else{

      // }
      this.getMismatchSerialArray;
      this.getMismatchSerialArray = res["responseData"];
      console.log("getMismatchSerialArray ", this.getMismatchSerialArray);
      this.getMismatchSerial();

      this.changeMismatchModal = true;

      this.getMismatchType();

      this.loadingMask = false;
    }, error => {
      this.loadingMask = false;
      this.showError(error)
    });

    this.mismatchService.addSerial(this.MismatchFinal).subscribe(res => {
      console.log("addSerial ", res)
      console.log("GetmismatchSerial>>>>>>>>>>>>>>>>>> ", this.MismatchFinal);

      // if (res['responseCode'] == 1) {
      //   this.showSuccess(res['responseData'])

      // } else {
      //   this.showError(res['responseData'])
      // }
      this.getMismatchSerialArray;
      this.getMismatchSerialArray = res["responseData"];
      // getMismatchRemoveSerialArray
      console.log("getMismatchSerialArray ", this.getMismatchSerialArray);
      this.getMismatchSerial();

      this.loadingMask = false;
    }, error => {
      this.loadingMask = false;
      this.showError(error)
    });

  }

  getMismatchType() {
    //this.loadingMask = true;
    this.mismatchService.getMismatchData().subscribe(res => {

      if (res.responseCode == 1) {
        this.getMismatchArray;
        this.getMismatchArray = res["responseData"];
        console.log("resss ", this.getMismatchArray)
        // this.loadingMask = false;
      } else {

      }
    }, error => {
      // this.loadingMask = false;
    });
  }

  closeStockAdjustmentModel() {
    this.changeMismatchModal = false;
    // this.getMismatchArray = new Array();
    // this.GetmismatchSerial.grnNo = null;
    // this.showSuccess("Mismatch Serials added Successfully!")
    this.getMismatchType();
    // this.getItemByItemID(this.itemId);
  }

  closestockAdjustmentmodal() {
    this.stockAdjustmentmodal = false;
    // this.getItemByItemID(this.itemId);
    this.getMismatchArray = new Array();
    this.GetmismatchSerial.itemId = null;
    // this.showSuccess("Mismatch Serials added Successfully!")
    // this.getMismatchType();
  }
  

}



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-report',
  templateUrl: './custom-report.component.html',
  styleUrls: ['./custom-report.component.scss']
})
export class CustomReportComponent implements OnInit {

    report1type: number = 0;
  report2type: number = 0;
  itemNo: number = 0;
  itemID: string = null;
  public user: string = "";

  public itemIDList: string[] = new Array<string>();
  date: string;
  innerHeight: string;
  loadingMask: boolean;
  
  constructor() { }

  ngOnInit() {
  }

  getReport1() {

  }

  getReport2() {
    
  }

}

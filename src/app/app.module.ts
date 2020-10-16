import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from "@clr/angular";
import { routing } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
// import { ChartModule } from 'angular-highcharts';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

import { UtilService } from './services/util.service';
import { MdecodeService } from './services/mdecode.service';
import { GrowlService } from './services/growl-service.service';
import { TreeModule } from 'angular-tree-component';
import { PickListModule } from 'primeng/picklist';

import { BranchMaintenanceComponent } from './branch-maintenance/branch-maintenance.component';

import { FilterPipe } from './pipes/batch-pipe';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { LoggedInUserModel } from './models/LoggedInUserModel';
import { GroupModel } from './models/GroupModel';
import { FunctionModel } from './models/FunctionModel';
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';

import { LoadingMaskComponent } from './loading-mask/loading-mask.component';
// import { VerificationComponent } from './verification/verification.component';
// import { StockDetailsComponent } from './stock-details/stock-details.component';
// import { GrnAcceptComponent } from './grn-accept/grn-accept.component';
import { OperationalDashboardComponent } from './operational-dashboard/operational-dashboard.component';
import { StrategicDashboardComponent } from './strategic-dashboard/strategic-dashboard.component';

// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxFontAwesomeModule } from 'ngx-font-awesome';

import { CubejsClientModule } from '@cubejs-client/ngx';
import { environment } from '../environments/environment';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

// import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
// import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { ReactiveFormsModule } from '@angular/forms';

// import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { CalendarModule } from 'primeng/components/calendar/calendar';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomReportComponent } from './custom-report/custom-report.component';
import { DistanceMaintenanceComponent } from './distance-maintenance/distance-maintenance.component';

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyCS38nvGqWX3XSZQSkkCMPgEu6jwDCuvNs",
  authDomain: "agrocropes-c9415.firebaseapp.com",
  databaseURL: "https://agrocropes-c9415.firebaseio.com",
  projectId: "agrocropes-c9415",
  storageBucket: "agrocropes-c9415.appspot.com",
  messagingSenderId: "309560786035",
  appId: "1:309560786035:web:b8038ddd5e947117f03e06",
  measurementId: "G-QC2JM0BXN8"
};

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

const cubejsOptions = {
  token:
    "0c00e571e87b1c0f77d8c5cac0344c7a5fdbc7713e10ff9bbf94e71ccf722faa3eadfb0dce12b34a547eb36cf051ed38d612929682b8ad21f3788ab6fa094279",
  options: {
    apiUrl: "http://localhost:4000/cubejs-api/v1"
  }
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    LoginComponent,
    // BusinessStructureComponent,
    // ReaderMaintenanceComponent,
    // AntennaMaintenanceComponent,
    BranchMaintenanceComponent,
    // CustomReportComponent,
    FilterPipe,
    // MismatchUpdateComponent,
    LoadingMaskComponent,
    // VerificationComponent,
    // StockDetailsComponent,
    // GrnAcceptComponent,
    DashboardComponent,
    OperationalDashboardComponent,
    StrategicDashboardComponent,
    CustomReportComponent,
    DistanceMaintenanceComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    TreeModule.forRoot(),
    PickListModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    HttpClientModule,
    GrowlModule,
    NgxFontAwesomeModule,
    CubejsClientModule.forRoot(cubejsOptions),
    CalendarModule,
    // NzDatePickerModule,
    // NgZorroAntdModule,
    ReactiveFormsModule,
    ScrollingModule,
    DragDropModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireDatabaseModule
  ],
  providers: [UtilService, MdecodeService,
    LoggedInUserModel, GroupModel, FunctionModel, MessageService, GrowlService],
  bootstrap: [AppComponent, StrategicDashboardComponent]
})

// , { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }
export class AppModule { }

export const AppParams = Object.freeze({

  REPORT_PATH: "http://192.0.0.192:8080/RPIS_BIRT/",
  BASE_PATH: "http://220.247.201.177:8080/ShortestPath-1.0/service/",
});


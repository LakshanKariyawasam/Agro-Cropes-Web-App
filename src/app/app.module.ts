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

import { TreeModule } from 'angular-tree-component';
import { PickListModule } from 'primeng/picklist';

import { BranchMaintenanceComponent } from './branch-maintenance/branch-maintenance.component';

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';

import { LoadingMaskComponent } from './loading-mask/loading-mask.component';
import { OperationalDashboardComponent } from './operational-dashboard/operational-dashboard.component';

import { NgxFontAwesomeModule } from 'ngx-font-awesome';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { CalendarModule } from 'primeng/components/calendar/calendar';

import { CustomReportComponent } from './custom-report/custom-report.component';
import { DistanceMaintenanceComponent } from './distance-maintenance/distance-maintenance.component';
import { LottieAnimationViewModule } from 'ng-lottie';


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
    BranchMaintenanceComponent,
    LoadingMaskComponent,
    OperationalDashboardComponent,
    CustomReportComponent,
    DistanceMaintenanceComponent
  ],
  imports: [

    LottieAnimationViewModule.forRoot(),
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
    CalendarModule,
    ReactiveFormsModule,
    ScrollingModule,
    DragDropModule,
    ReactiveFormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})

// , { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }

export class AppModule { }

export const AppParams = Object.freeze({
  REPORT_PATH: "http://192.0.0.192:8080/RPIS_BIRT/",
  BASE_PATH: "http://220.247.201.177:8080/ShortestPath-1.0/service/",
});


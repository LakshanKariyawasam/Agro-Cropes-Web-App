import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BranchMaintenanceComponent } from './branch-maintenance/branch-maintenance.component';
import { OperationalDashboardComponent } from './operational-dashboard/operational-dashboard.component';
import { CustomReportComponent } from './custom-report/custom-report.component';
import { DistanceMaintenanceComponent } from './distance-maintenance/distance-maintenance.component';

const routes: Routes = [];
const appRoutes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'operational-dashboard',
        component: OperationalDashboardComponent
    },

    {
        path: 'branch-maintenance',
        component: BranchMaintenanceComponent
    },

    {
        path: 'distance-maintenance',
        component: DistanceMaintenanceComponent
    },

    {
        path: 'custom-report',
        component: CustomReportComponent
    },

    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }



export const routing = RouterModule.forRoot(appRoutes);
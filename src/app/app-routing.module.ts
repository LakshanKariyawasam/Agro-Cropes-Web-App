import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserMaintenanceComponent } from './user-maintenance/user-maintenance.component';
import { OperationalDashboardComponent } from './operational-dashboard/operational-dashboard.component'
import { StrategicDashboardComponent } from './strategic-dashboard/strategic-dashboard.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderAcceptComponent } from './order-accept/order-accept.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [];
const appRoutes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'dashboard',
        component: DashboardComponent
    },

    {
        path: 'operational-dashboard',
        component: OperationalDashboardComponent
    },

    {
        path: 'strategic-dashboard',
        component: StrategicDashboardComponent
    },

    {
        path: 'user-maintenance',
        component: UserMaintenanceComponent
    },


    {
        path: 'order-accept',
        component: OrderAcceptComponent
    },

    {
        path: 'register',
        component: RegisterComponent
    },

    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }



export const routing = RouterModule.forRoot(appRoutes);
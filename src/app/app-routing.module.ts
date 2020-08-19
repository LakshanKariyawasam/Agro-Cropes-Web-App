import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserMaintenanceComponent } from './user-maintenance/user-maintenance.component';
import { OperationalDashboardComponent } from './operational-dashboard/operational-dashboard.component'
import { StrategicDashboardComponent } from './strategic-dashboard/strategic-dashboard.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderAcceptComponent } from './order-accept/order-accept.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from "../app/guard/auth.guard";

const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },

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

    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },

    {
        path: 'verify-email-address',
        component: VerifyEmailComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
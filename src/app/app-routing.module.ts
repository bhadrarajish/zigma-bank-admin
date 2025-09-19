import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { BeneficiariesComponent } from './pages/beneficiaries/beneficiaries.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'beneficiaries', component: BeneficiariesComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

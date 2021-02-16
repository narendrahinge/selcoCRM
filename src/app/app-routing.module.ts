import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PainkillerComponent } from './painkiller/painkiller.component';
import { GlobalpharmaComponent } from './globalpharma/globalpharma.component';
import { DrugstoreComponent } from './drugstore/drugstore.component';
import { AllorderComponent } from './allorder/allorder.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ManualorderComponent } from './manualorder/manualorder.component';
import { OrdercpComponent } from './ordercp/ordercp.component';
import { TramaexComponent } from './tramaex/tramaex.component';
import { TramasaleComponent } from './tramasale/tramasale.component';
import { EnquirysComponent } from './enquirys/enquirys.component';
import { CaseComponent } from './case/case.component';
import { BuyanxityComponent } from './buyanxity/buyanxity.component';
import { BuytraolcodComponent } from './buytraolcod/buytraolcod.component';
import { TramhowtoComponent } from './tramhowto/tramhowto.component';
import { AdminreportComponent } from './adminreport/adminreport.component';
import { StripepayComponent } from './stripepay/stripepay.component';
import { UndeliveredComponent } from './undelivered/undelivered.component';
import { AsalefollowupComponent } from './asalefollowup/asalefollowup.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allorder', component: AllorderComponent },
  { path: "stripepay", component: StripepayComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'manualorder', component: ManualorderComponent },
  { path: 'painkill', component: PainkillerComponent },
  { path: 'globalpharma', component: GlobalpharmaComponent },
  { path: 'drugstore', component: DrugstoreComponent },
  { path: 'ordercp', component: OrdercpComponent },
  { path: 'tramaex', component: TramaexComponent },
  { path: 'tramasale', component: TramasaleComponent },
  { path: 'buyanxi', component: BuyanxityComponent },
  { path: 'buytraolcod', component: BuytraolcodComponent },
  { path: 'tramhowto', component: TramhowtoComponent },
  { path: 'enquirys', component: EnquirysComponent },
  { path: 'adminreport', component: AdminreportComponent },
  { path: "undelivered", component: UndeliveredComponent },
  { path: "aftersalesfollowup", component: AsalefollowupComponent },
  { path: 'cases', component: CaseComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

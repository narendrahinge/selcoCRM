import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainkillerComponent, DialogOverviewExampleDialog, OcStatusUpdateBottomSheetPain } from './painkiller/painkiller.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PainServiceService } from 'src/app/services/pain-service.service';

import {
  MatInputModule,
  MatButtonModule,
  MatTabsModule,
  MatSortModule,
  MatTableModule,
  MatDialogModule,
  MatGridListModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatSelectModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatBadgeModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatBottomSheetModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatSlideToggleModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent, TodayOrderDetailDialog, OcStatusUpdateBottomSheet } from './dashboard/dashboard.component';
import { ExcelService } from './services/excel.service';
import { AddtrakingpainComponent } from './painkiller/add-traking-modals/Addtraking.component';
import { AddshippingComponent } from './painkiller/add-shiping-agency/addshipping.component';
import { AddshippingtoComponent } from './dashboard/add-shiping-agency/addshipping.component';
import { AddtrakingtocComponent } from './dashboard/add-traking-modals/Addtraking.component';
import { GlobalpharmaComponent, DetailsdialogGlobalPharma, OcStatusUpdateBottomSheetGlobal } from './globalpharma/globalpharma.component';
import { AddshippingComponentGlobal } from './globalpharma/add-shiping-agency/addshipping.component';
import { AddtrakinglobalpharmaComponent } from './globalpharma/add-traking-modals/Addtraking.component';
import { DrugstoreComponent, DetailsDialogDrugstore, OcStatusUpdateBottomSheetDrugstore } from './drugstore/drugstore.component';
import { AddshippingDrugstoreComponent } from './drugstore/add-shiping-agency/addshipping.component';
import { AddtrakingDrugstoreComponent } from './drugstore/add-traking-modals/Addtraking.component';
import { AllorderComponent, AllOrderDetailsDialog, AllOrderStatusUpdateDialog } from './allorder/allorder.component';
import { AddshippingAllOrderComponent } from './allorder/add-shiping-agency/addshipping.component';
import { AddtrakingAllOrderComponent } from './allorder/add-traking-modals/Addtraking.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ManualorderComponent, DetailsDialogManualOrder, OcStatusUpdateBottomSheetManualOrder } from './manualorder/manualorder.component';
import { AddtrakingManualOcComponent } from './manualorder/add-traking-modals/Addtraking.component';
import { AngularEditorModule } from '@sedlan/angular-edit';
import { ComposeMailBodyComponent } from './allorder/compose-email-modal/composebody.component';
import { OrdercpComponent, DetailsDialogOrdercp, OcStatusUpdateBottomSheetOrdercp } from './ordercp/ordercp.component';
import { AddshippingOrdercpComponent } from './ordercp/add-shiping-agency/addshipping.component';
import { AddtrakingOrderComponent } from './ordercp/add-traking-modals/Addtraking.component';
import { TramaexComponent, DetailsDialogTramaEx, OcStatusUpdateBottomSheetTramaEx } from './tramaex/tramaex.component';
import { AddshippingTramaExComponent } from './tramaex/add-shiping-agency/addshipping.component';
import { AddtrakingTramaExComponent } from './tramaex/add-traking-modals/Addtraking.component';
import { EditManulaOrderComponent } from './manualorder/edit-manual-order/EditOrder.component';
import { TramasaleComponent, DetailsDialogTramaSale, OcStatusUpdateBottomSheetTramaSale } from './tramasale/tramasale.component';
import { AddshippingTramaSaleComponent } from './tramasale/add-shiping-agency/addshipping.component';
import { AddtrakingTramaSaleComponent } from './tramasale/add-traking-modals/Addtraking.component';
import { AddPaymentLinkModalComponent } from './dashboard/add-payment-link-modal/addshipping.component';
import { EnquirysComponent } from './enquirys/enquirys.component';
import { CaseComponent } from './case/case.component';
import { CaseDetailsComponent } from './case/case-details-dialog/casedetails.component';
import { AddtrakingAllCaseComponent } from './case/add-traking-modals/Addtraking.component';
import { BuyanxityComponent, DetailsDialogBuyAnxi, OcStatusUpdateBottomSheetBuyAnxi } from './buyanxity/buyanxity.component';
import { AddshippingBuyAnxiComponent } from './buyanxity/add-shiping-agency/addshipping.component';
import { AddtrakingBuyAnxiComponent } from './buyanxity/add-traking-modals/Addtraking.component';
import { BuytraolcodComponent, DetailsDialogTramaolcod, OcStatusUpdateBottomSheetTramaolcod } from './buytraolcod/buytraolcod.component';
import { AddshippingTramaolcodComponent } from './buytraolcod/add-shiping-agency/addshipping.component';
import { AddtrakingTramaolcodComponent } from './buytraolcod/add-traking-modals/Addtraking.component';
import { TramhowtoComponent, DetailsDialogTramhowto, OcStatusUpdateBottomSheettramhowto } from './tramhowto/tramhowto.component';
import { AddshippingTramhowto } from './tramhowto/add-shiping-agency/addshipping.component';
import { AddtrakingTramhowtoComponent } from './tramhowto/add-traking-modals/Addtraking.component';
import { AdminreportComponent, AdminReprtDialog } from './adminreport/adminreport.component';
import { DetailsDialogStripePay, StripepayComponent, OcStatusUpdateBottomSheetStripepay } from './stripepay/stripepay.component';
import { AddshippingStripepayComponent } from './stripepay/add-shiping-agency/addshipping.component';
import { AddtrakingStripepayComponent } from './stripepay/add-traking-modals/Addtraking.component';
import { OcStatusUpdateBottomSheetUndelivredoc, UndeliveredComponent, UndeliveredOrderDetailsDialog } from './undelivered/undelivered.component';
import { AftersalesfollowupOrderDetailsDialog, AsalefollowupComponent, OcStatusUpdateBottomSheetfollowupoc } from './asalefollowup/asalefollowup.component';
import { WatchqueueComponent } from './asalefollowup/watch-queue-modal/addshipping.component';
import { CallModalComponent } from './asalefollowup/call-modal/callmodal.component';



@NgModule({
  declarations: [
    AppComponent,
    PainkillerComponent,
    DialogOverviewExampleDialog,
    UndeliveredOrderDetailsDialog,
    AftersalesfollowupOrderDetailsDialog,
    AllOrderDetailsDialog,
    CaseDetailsComponent,
    DetailsdialogGlobalPharma,
    DetailsDialogDrugstore,
    DetailsDialogOrdercp,
    DetailsDialogTramaEx,
    DetailsDialogTramaSale,
    DetailsDialogBuyAnxi,
    DetailsDialogStripePay,
    DetailsDialogTramaolcod,
    DetailsDialogManualOrder,
    DetailsDialogTramhowto,
    AllOrderStatusUpdateDialog,
    OcStatusUpdateBottomSheet,
    OcStatusUpdateBottomSheetPain,
    OcStatusUpdateBottomSheetGlobal,
    OcStatusUpdateBottomSheetDrugstore,
    OcStatusUpdateBottomSheetOrdercp,
    OcStatusUpdateBottomSheetTramaEx,
    OcStatusUpdateBottomSheetTramaSale,
    OcStatusUpdateBottomSheetBuyAnxi,
    OcStatusUpdateBottomSheetStripepay,
    OcStatusUpdateBottomSheetTramaolcod,
    OcStatusUpdateBottomSheetManualOrder,
    OcStatusUpdateBottomSheettramhowto,
    OcStatusUpdateBottomSheetUndelivredoc,
    OcStatusUpdateBottomSheetfollowupoc,
    TodayOrderDetailDialog,
    AdminReprtDialog,
    AddtrakingpainComponent,
    AddtrakinglobalpharmaComponent,
    AddtrakingDrugstoreComponent,
    AddtrakingOrderComponent,
    AddtrakingTramaExComponent,
    AddtrakingTramaSaleComponent,
    AddtrakingBuyAnxiComponent,
    AddtrakingStripepayComponent,
    AddtrakingTramaolcodComponent,
    AddtrakingtocComponent,
    AddtrakingAllOrderComponent,
    AddtrakingManualOcComponent,
    AddtrakingAllCaseComponent,
    AddtrakingTramhowtoComponent,
    AddshippingAllOrderComponent,
    AddshippingtoComponent,
    AddshippingComponent,
    AddshippingComponentGlobal,
    AddshippingDrugstoreComponent,
    AddshippingOrdercpComponent,
    AddshippingTramaExComponent,
    AddshippingTramaSaleComponent,
    AddshippingBuyAnxiComponent,
    AddshippingStripepayComponent,
    AddshippingTramaolcodComponent,
    AddshippingTramhowto,
    LoginComponent,
    DashboardComponent,
    GlobalpharmaComponent,
    DrugstoreComponent,
    AllorderComponent,
    StatisticsComponent,
    ManualorderComponent,
    EditManulaOrderComponent,
    ComposeMailBodyComponent,
    OrdercpComponent,
    TramaexComponent,
    TramasaleComponent,
    AddPaymentLinkModalComponent,
    EnquirysComponent,
    CaseComponent,
    BuyanxityComponent,
    BuytraolcodComponent,
    TramhowtoComponent,
    AdminreportComponent,
    StripepayComponent,
    UndeliveredComponent,
    AsalefollowupComponent,
    WatchqueueComponent,
    CallModalComponent   
  ],
  entryComponents: [
    DialogOverviewExampleDialog, 
    AllOrderDetailsDialog,
    UndeliveredOrderDetailsDialog,
    AftersalesfollowupOrderDetailsDialog,
    CaseDetailsComponent,
    DetailsdialogGlobalPharma,
    DetailsDialogDrugstore,
    DetailsDialogOrdercp,
    DetailsDialogTramaEx,
    DetailsDialogTramaSale,
    DetailsDialogBuyAnxi,
    DetailsDialogStripePay,
    DetailsDialogTramaolcod,
    TodayOrderDetailDialog, 
    DetailsDialogManualOrder,
    DetailsDialogTramhowto,
    AllOrderStatusUpdateDialog,
    AdminReprtDialog,
    OcStatusUpdateBottomSheet, 
    OcStatusUpdateBottomSheetPain, 
    OcStatusUpdateBottomSheetGlobal,
    OcStatusUpdateBottomSheetDrugstore,
    OcStatusUpdateBottomSheetOrdercp,
    OcStatusUpdateBottomSheetTramaEx,
    OcStatusUpdateBottomSheetTramaSale,
    OcStatusUpdateBottomSheetBuyAnxi,
    OcStatusUpdateBottomSheetStripepay,
    OcStatusUpdateBottomSheetTramaolcod,
    OcStatusUpdateBottomSheetManualOrder,
    OcStatusUpdateBottomSheettramhowto,
    OcStatusUpdateBottomSheetUndelivredoc,
    OcStatusUpdateBottomSheetfollowupoc,
    AddtrakingpainComponent,
    AddtrakinglobalpharmaComponent, 
    AddtrakingDrugstoreComponent,
    AddtrakingOrderComponent,
    AddtrakingTramaExComponent,
    AddtrakingTramaSaleComponent,
    AddtrakingBuyAnxiComponent,
    AddtrakingStripepayComponent,
    AddtrakingTramaolcodComponent,
    AddtrakingtocComponent,
    AddtrakingAllOrderComponent,
    AddtrakingManualOcComponent,
    AddtrakingAllCaseComponent,
    AddtrakingTramhowtoComponent,
    AddshippingAllOrderComponent,
    AddshippingComponent,
    AddshippingComponentGlobal,
    AddshippingDrugstoreComponent,
    AddshippingOrdercpComponent,
    AddshippingTramaExComponent,
    AddshippingTramaSaleComponent,
    AddshippingTramaolcodComponent,
    AddshippingBuyAnxiComponent,
    AddshippingStripepayComponent,
    AddshippingTramhowto,
    AddshippingtoComponent,
    EditManulaOrderComponent,
    ComposeMailBodyComponent,
    AddPaymentLinkModalComponent,
    WatchqueueComponent,
    CallModalComponent
  ],
  imports: [
    BrowserModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatExpansionModule,
    AngularEditorModule

  ],
  providers: [PainServiceService, ExcelService, PainkillerComponent, AllorderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

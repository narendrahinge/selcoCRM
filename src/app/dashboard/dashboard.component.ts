import { Component, OnInit, ViewChild, ElementRef, Inject, Input } from '@angular/core';
import { PainServiceService } from '../services/pain-service.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Dessert } from '../painkiller/painkiller.component';
import { AppComponent } from '../app.component';
import { ExcelService } from '../services/excel.service';
import { AddshippingtoComponent } from './add-shiping-agency/addshipping.component';
import { AddtrakingtocComponent } from './add-traking-modals/Addtraking.component';
import { ComposeMailBodyComponent } from '../allorder/compose-email-modal/composebody.component';
import { AddPaymentLinkModalComponent } from './add-payment-link-modal/addshipping.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {
  resposeData: any;
  selectrow: any;
  userData = {};
  selItems = 0;
  todayOrderi = 0;

  status = false;
  statusList = [];
  statausSelectedItem = [];
  dropdownSettingsStatus = {};

  websiteList = [];
  websiteSelectedItem = [];
  dropdownSettingsWebsite = {};

  nor: boolean;

  loadSts = false;
  currSelect = "";

  displayedColumns: string[] = ['inc', 'status', 'web', 'invid', 'date', 'phone', 'email', 'name', 'prname', 'shsts', 'trck', 'oid'];
  listData: MatTableDataSource<any>;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public painserv: PainServiceService,
    public _router: Router,
    public dialog: MatDialog,
    public appMod: AppComponent,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    public excelService: ExcelService,
  ) {
    this.nor = true;
    if (this.painserv.login_check()) {
      this.status = true;
    } else {
      this._router.navigate(['login']);
    }
  }


  ngOnInit() {
    this.painserv.postData(this.userData, "todayorder").then((result) => {
      this.resposeData = result;
      if (this.resposeData.status == "0") {
        this.nor = false;
      } else {
        var arr = this.sortByDate(this.resposeData.userData);
        this.listData = new MatTableDataSource(this.resposeData.userData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

        this.todayOrderi = this.resposeData.userData.length;
        this.appMod.todayOrderi = this.todayOrderi;
      }
    }, (err) => {
      //Connection failed message
    });

    /* Muliselect Dropdown Setting Options Start --- */
    this.statusList = [
      { item_id: 1, item_text: 'Pending' },
      { item_id: 2, item_text: 'Processed' },
      { item_id: 3, item_text: 'Shipped' },
      { item_id: 4, item_text: 'Tracking' },
      { item_id: 5, item_text: 'Delivered' },
      { item_id: 6, item_text: 'Undelivered' },
      { item_id: 7, item_text: 'Cancelled' }
    ];

    this.dropdownSettingsStatus = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.websiteList = [
      { inx: 1, url: 'sedegital.com' },
      { inx: 2, url: 'painkillermedicines.com' },
      { inx: 3, url: 'globalpharmamedicines.com' },
      { inx: 4, url: 'ordercypionate.com' },
      { inx: 5, url: 'tramadolexport.com' },
      { inx: 6, url: 'tramadolsale.com' },
      { inx: 7, url: 'drugstoreplanet.com' },
      { inx: 8, url: 'bytramadolonlinecod.com' },
      { inx: 9, url: 'buyanxietymedicines.com' },
      { inx: 10, url: 'thtramadol-howto.com' },
      { inx: 11, url: 'Manualorder' },
      { inx: 12, url: 'globalpharmamed.com'}
    ];

    this.dropdownSettingsWebsite = {
      singleSelection: true,
      idField: 'inx',
      textField: 'url',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    /* Muliselect Dropdown Setting Options End --- */


  }

  openDialog(inx): void {
    var array = this.singleArrReturnByVal(this.resposeData.userData, inx);
    const dialogRef = this.dialog.open(TodayOrderDetailDialog, {
      width: '850px',
      data: { array: array }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  calculateTotal(id) {
    var finaltot: any;
    let array: any = this.singleArrReturnByVal(this.resposeData.userData, id);

    var ptot = 0;
    for (let i = 0; i < array.prname.length; i++) {
      var qty = array.prname[i]['qty'];
      var price = array.prname[i]['price'];
      ptot = ptot + Number(qty * price);
    }
    finaltot = ptot;
    if (finaltot > 350) {
      if (array.web == "globalpharmamedicines.com") {
        if (finaltot > 450) {
          var dis = ptot * 15 / 100;
        } else {
          var dis = 0;
        }
      } else {
        if (finaltot > 600) {
          var dis = ptot * 7 / 100;
        } else {
          var dis = 0;
        }
      }

      finaltot = (ptot - dis).toFixed(2);
    } else {
      finaltot = (ptot + 20).toFixed(2);
    }

    if (array.web == "Manualorder") {
      finaltot = (Number(array.prname[0]['price']) + 20).toFixed(2);
    }
    return finaltot;
  }

  ExportTOExcel() {
    /*const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'TodayOrderReport.xlsx');*/

    this.excelService.exportAsExcelFile(this.resposeData.userData, 'TodayOrder');
  }


  onItemSelectStatus(item: any) {
    this.currSelect = item.item_text;
    this.listData.filter = item.item_text;
    if (this.listData.filteredData.length == 0) {
      this.nor = false;
    } else {
      this.nor = true;
    }
    this.selItems = this.listData.filteredData.length;
    //console.log(this.listData.filteredData.length);
  }
  onDeselectStatus(items: any) {
    this.currSelect = "";
    this.listData.filter = "";
    if (this.listData.filteredData.length > 0) {
      this.nor = true;
    } else {
      this.nor = false;
    }
    this.selItems = 0;
  }

  onItemSelectWebsite(item: any) {
    this.currSelect = item.url;
    this.listData.filter = item.url;
    if (this.listData.filteredData.length == 0) {
      this.nor = false;
    } else {
      this.nor = true;
    }
    this.selItems = this.listData.filteredData.length;
  }


  onDeselectWebsite(items: any) {
    this.currSelect = "";
    this.listData.filter = "";
    if (this.listData.filteredData.length > 0) {
      this.nor = true;
    } else {
      this.nor = false;
    }
    this.selItems = 0;
  }

  deleteOrder(inx, web) {
    if (confirm("Are you sure to delete this Order?")) {
      this.loadSts = true;
      this.painserv.postData({ 'id': inx, 'web': web }, "dltTodayOrder").then((result) => {
        this.resposeData = result;
        var arr = this.sortByDate(this.resposeData.userData);
        this.listData = new MatTableDataSource(this.resposeData.userData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.todayOrderi = this.resposeData.userData.length;
        this.listData.filter = this.currSelect;
        this.appMod.todayOrderi = this.todayOrderi;
        this.loadSts = false;
      }, (err) => {
        //Connection failed message
      });
    }
  }

  updateStatus(oid: any, pstsval: any, web: any) {
    let stsVal: any;
    const bottmSheet = this.dialog.open(OcStatusUpdateBottomSheet, {
      width: '300px',
      data: { oid: oid, pstsval: pstsval, stsVal: stsVal, web: web }
    });

    bottmSheet.afterClosed().subscribe(result => {
      if (result) {
        this.loadSts = true;
        this.painserv.postData({ 'oid': oid, "statusval": result, "web": web }, "updatestatusor").then((result) => {
          this.resposeData = result;
          var arr = this.sortByDate(this.resposeData.userData);
          this.listData = new MatTableDataSource(this.resposeData.userData);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filter = this.currSelect;
          this.loadSts = false;
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }

  addshipping(oid: any, web: any): void {
    var shipp: any;
    const addtrkmodal = this.dialog.open(AddshippingtoComponent, {
      width: '300px',
      data: { shipp: shipp }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
        this.loadSts = true;
        this.painserv.postData({ 'oid': oid, "shipp": result, 'web': web }, "addshippingtoc").then((result) => {
          this.resposeData = result;
          var arr = this.sortByDate(this.resposeData.userData);
          this.listData = new MatTableDataSource(this.resposeData.userData);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filter = this.currSelect;
          this.loadSts = false;
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }

  addTrakingid(oid: any, web: any): void {
    var tids = [{ "trakingid": "" }];
    const addtrkmodal = this.dialog.open(AddtrakingtocComponent, {
      width: '400px',
      data: { tids: tids }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
        this.loadSts = true;
        this.painserv.postData({ 'oid': oid, "trakingids": result, "web": web }, "addtrakingidtoc").then((result) => {
          this.resposeData = result;
          var arr = this.sortByDate(this.resposeData.userData);
          this.listData = new MatTableDataSource(this.resposeData.userData);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filter = this.currSelect;
          this.loadSts = false;
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }


  composeEmail(email, web, uname, invid) {
    const composemail = this.dialog.open(ComposeMailBodyComponent, {
      width: '800px',
      data: { subject: '', body: '' }
    });

    composemail.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let _snkbr = this.snackBar.open("Sending.....", "Please Wait", {
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });

        this.painserv.postData({ 'email': email, "web": web, "subject": result.subject, 'body': result.body }, "allocsendcomposemail").then((reponce) => {
          console.log(reponce);
          _snkbr.dismiss();
          this.snackBar.open("Message Sent", "DISMISS", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }

  sortByDate(data) {
    return data.sort(function (a, b) {
      var sdate1 = a.date;
      var sdate2 = b.date;
      var date1a = sdate1.split("/");
      var date2a = sdate2.split("/");
      var date1 = date1a[2] + "-" + date1a[1] + "-" + date1a[0];
      var date2 = date2a[2] + "-" + date2a[1] + "-" + date2a[0];
      return <any>new Date(date2) - <any>new Date(date1);
    });
  }

  singleArrReturnByVal(arr, val) {
    var carr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].inc == val) {
        carr = arr[i];
      }
    }
    return carr;
  }


  selctrow(row) {
    this.selectrow = row.inc;
  }

  makecall(phn, country) {
    this.painserv.makecall(phn, country).then(res=> {
      console.log(res)
    })
  }
  

}



@Component({
  selector: 'detail-dialog',
  templateUrl: 'detail-dialog.html',
  styleUrls: ['dialog.css']
})
export class TodayOrderDetailDialog {
  total: any;
  stslod = false;
  paylinksts = false;
  discount: any;
  subtot: any;
  constructor(

    public dialogRef: MatDialogRef<TodayOrderDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Dessert,
    public dialog: MatDialog,
    public painserv: PainServiceService,
    private snackBar: MatSnackBar
  ) { }
    
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    var ptot = 0;
    for (let i = 0; i < this.data.array.prname.length; i++) {
      var qty = this.data.array.prname[i]['qty'];
      var price = this.data.array.prname[i]['price'];
      ptot = ptot + Number(qty * price);
    }
    this.subtot = ptot.toFixed(2);
    this.total = ptot;
    if (this.total > 350) {
      if (this.data.array.web == "globalpharmamedicines.com") {
        if (this.total > 450) {
          var dis = ptot * 15 / 100;
        } else {
          var dis = 0;
        }
      } else {
        if (this.total > 600) {
          var dis = ptot * 7 / 100;
        } else {
          var dis = 0;
        }
      }
      this.discount = dis.toFixed(2);
      this.total = (ptot - dis).toFixed(2);
    } else {
      this.total = (ptot + 20).toFixed(2);
    }

    if (this.data.array.web == "Manualorder") {
      this.total = (Number(this.data.array.prname[0]['price']) + 20).toFixed(2);
    }
  }

  addTraking(oid: any, web: any): void {
    var tids = [{ "trakingid": "" }];
    const addtrkmodal = this.dialog.open(AddtrakingtocComponent, {
      width: '500px',
      data: { tids: tids }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
        let _snkbr = this.snackBar.open("Adding...", "Please Wait", {
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });

        var trckarr = [];
        for (let i = 0; i < result.length; i++) {
          trckarr.push(result[i].trakingid);
        }

        this.painserv.postData({ 'oid': oid, "trakingids": result, "web": web }, "addtrakingidtoc").then((result) => {
          _snkbr.dismiss();
          this.snackBar.open("Successfully Add", "SUCCESS", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });
          this.data.array.trck = trckarr;
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }

  deletetracking(arrtrck, web): void {
    var tids = [];
    for (var i = 0; i < arrtrck.length; i++) {
      var abc = {};
      abc['trakingid'] = arrtrck[i].tracking_id;
      abc['trakinglink'] = arrtrck[i].tracking_link;
      abc['ids'] = arrtrck[i].id;
      tids.push(abc);
    }

    const addtrkmodal = this.dialog.open(AddtrakingtocComponent, {
      width: '500px',
      data: { tids: tids, del:"yes", web:web }
    });
  }


  resendTrakingid(oid, web) {
    this.stslod = true;
    this.painserv.postData({ 'oid': oid, "web": web }, "rtrakingmail").then((result) => {
      this.stslod = false;
    }, (err) => {
      //Connection failed message
    });
  }

  addpaymentlink(data): void {
    var shipp: any;
    const addtrkmodal = this.dialog.open(AddPaymentLinkModalComponent, {
      width: '300px',
      data: { shipp: shipp }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
        this.paylinksts = true;
        this.painserv.postData({ 'data': data, "linkurl": result }, "addpaymentlink").then((result) => {
          this.paylinksts = false;
          data.pay_link = result;
          alert("Link Saved!, Mail send to customer");
          //window.location.reload();
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }

  updatepaymentlink(data): void {
    const addtrkmodal = this.dialog.open(AddPaymentLinkModalComponent, {
      width: '300px',
      data: { shipp:  data.pay_link}
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
        this.paylinksts = true;
        this.painserv.postData({ 'data': data, "linkurl": result }, "addpaymentlink").then((result) => {
          this.paylinksts = false;
          data.pay_link = result;
          alert("Link Saved!, Mail send to customer");
          //window.location.reload();
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }



  resendpaymentlink(data) {
    this.paylinksts = true;
    this.painserv.postData({ 'data': data }, "resendpaymentmail").then((result) => {
      this.paylinksts = false;
    }, (err) => {
      //Connection failed message
    });
  }


}



@Component({
  selector: 'or-status-update',
  templateUrl: 'or-status-update.html',
  styleUrls: ['or-status-update.css']
})
export class OcStatusUpdateBottomSheet {
  ststusList = [];
  statusVal: any;
  constructor(
    public dialogRef: MatDialogRef<OcStatusUpdateBottomSheet>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    data.stsVal = data.pstsval;
    this.ststusList = [
      { item_id: 1, item_text: 'Pending' },
      { item_id: 2, item_text: 'Processed' },
      { item_id: 3, item_text: 'Shipped' },
      { item_id: 4, item_text: 'Tracking' },
      { item_id: 5, item_text: 'Delivered' },
      { item_id: 6, item_text: 'Undelivered' },
      { item_id: 7, item_text: 'Cancelled' }
    ];

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}







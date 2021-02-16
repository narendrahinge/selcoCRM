import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ComposeMailBodyComponent } from '../allorder/compose-email-modal/composebody.component';
import { AppComponent } from '../app.component';
import { Dessert } from '../painkiller/painkiller.component';
import { ExcelService } from '../services/excel.service';
import { PainServiceService } from '../services/pain-service.service';

@Component({
  selector: 'app-undelivered',
  templateUrl: './undelivered.component.html',
  styleUrls: ['./undelivered.component.css']
})
export class UndeliveredComponent implements OnInit {
  resposeData: any;
  selectrow: any;
  userData = {};
  selItems = 0;
  todayOrderi = 0;
  searchKey: any;
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

  displayedColumns: string[] = ['inc', 'status', 'web', 'invid', 'date', 'phone', 'email', 'name', 'prname', 'oid'];
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
    this.painserv.postData(this.userData, "getallundelivredoc").then((result) => {
      this.resposeData = result;
      if (this.resposeData.status == "0") {
        this.nor = false;
      } else {
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
      { item_id: 1, item_text: 'NA' },
      { item_id: 2, item_text: 'Reship' },
      { item_id: 3, item_text: 'Refund' },
      { item_id: 4, item_text: '20 pills extra' },
      { item_id: 5, item_text: '20+ pills extra' },
      { item_id: 6, item_text: 'Partial refund' },
      { item_id: 7, item_text: 'Delivered' }
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
      { inx: 11, url: 'Manualorder' }
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



  }

  openDialog(inx): void {
    var array = this.singleArrReturn(this.resposeData.userData, inx);
    const dialogRef = this.dialog.open(UndeliveredOrderDetailsDialog, {
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
    for (let i = 0; i < array.detailsarr.prname.length; i++) {
      var qty = array.detailsarr.prname[i]['qty'];
      var price = array.detailsarr.prname[i]['price'];
      ptot = ptot + Number(qty * price);
    }
    finaltot = ptot;
    if (finaltot > 350) {
      if (array.detailsarr.web == "globalpharmamedicines.com") {
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

    if (array.detailsarr.web == "Manualorder") {
      finaltot = (Number(array.detailsarr.prname[0]['price']) + 20).toFixed(2);
    }
    return finaltot;
  }

  applyFilter() {
    this.currSelect = this.searchKey;
    this.listData.filter = this.searchKey;
    if (this.listData.filteredData.length == 0) {
      this.nor = false;
      this.selItems = 0;
    } else {
      this.nor = true;
      if (this.searchKey == "") {
        this.selItems = 0;
      } else {
        this.selItems = this.listData.filteredData.length;
      }

    }
  }


  ExportTOExcel() {
    this.excelService.exportAsExcelFile(this.resposeData.userData, 'Undelivered');
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

  deleteOrder(inx) {
    if (confirm("Are you sure to delete this Order from Undelivred section?")) {
      this.loadSts = true;
      this.painserv.postData({ 'id': inx }, "deleteundelivredoc").then((result) => {
        this.resposeData = result;
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


  updateStatus(oid: any, pstsval: any) {
    let stsVal: any;
    const bottmSheet = this.dialog.open(OcStatusUpdateBottomSheetUndelivredoc, {
      width: '300px',
      data: { oid: oid, pstsval: pstsval, stsVal: stsVal }
    });

    bottmSheet.afterClosed().subscribe(result => {
      if (result) {
        if (result == "Delivered" || result == "Undelivered") {
          if (confirm("Are you sure want to make this order " + result + " beacause when you change status to " + result + " order remove from Undelivered section?")) {
            this.loadSts = true;
            this.painserv.postData({ 'oid': oid, "statusval": result }, "changestsundelivredoc").then((result) => {
              this.resposeData = result;
              this.listData = new MatTableDataSource(this.resposeData.userData);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;
              this.listData.filter = this.currSelect;
              this.loadSts = false;
            }, (err) => {
              //Connection failed message
            });
          }
        } else {
          this.loadSts = true;
          this.painserv.postData({ 'oid': oid, "statusval": result }, "changestsundelivredoc").then((result) => {
            this.resposeData = result;
            this.listData = new MatTableDataSource(this.resposeData.userData);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
            this.listData.filter = this.currSelect;
            this.loadSts = false;
          }, (err) => {
            //Connection failed message
          });
        }

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


  singleArrReturnByVal(arr, val) {
    var carr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].inc == val) {
        carr = arr[i];
      }
    }
    return carr;
  }

  singleArrReturn(arr, val) {
    var carr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == val) {
        carr = arr[i];
      }
    }
    return carr;
  }


  selctrow(row) {
    this.selectrow = row.id;
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
export class UndeliveredOrderDetailsDialog {
  total: any;
  stslod = false;
  paylinksts = false;
  discount: any;
  subtot: any;
  constructor(

    public dialogRef: MatDialogRef<UndeliveredOrderDetailsDialog>,
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
    for (let i = 0; i < this.data.array.detailsarr.prname.length; i++) {
      var qty = this.data.array.detailsarr.prname[i]['qty'];
      var price = this.data.array.detailsarr.prname[i]['price'];
      ptot = ptot + Number(qty * price);
    }
    this.subtot = ptot.toFixed(2);
    this.total = ptot;
    if (this.total > 350) {
      if (this.data.array.detailsarr.web == "globalpharmamedicines.com") {
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

    if (this.data.array.detailsarr.web == "Manualorder") {
      this.total = (Number(this.data.array.detailsarr.prname[0]['price']) + 20).toFixed(2);
    }
  }



}



@Component({
  selector: 'or-status-update',
  templateUrl: 'or-status-update.html',
  styleUrls: ['or-status-update.css']
})
export class OcStatusUpdateBottomSheetUndelivredoc {
  ststusList = [];
  statusVal: any;
  constructor(
    public dialogRef: MatDialogRef<OcStatusUpdateBottomSheetUndelivredoc>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    data.stsVal = data.pstsval;
    this.ststusList = [
      { item_id: 1, item_text: 'NA' },
      { item_id: 2, item_text: 'Reship' },
      { item_id: 3, item_text: 'Refund' },
      { item_id: 4, item_text: '20 pills extra' },
      { item_id: 5, item_text: '20+ pills extra' },
      { item_id: 6, item_text: 'Partial refund' },
      { item_id: 7, item_text: 'Delivered' }
    ];

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


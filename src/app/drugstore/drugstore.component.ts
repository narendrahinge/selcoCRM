import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PainServiceService } from '../services/pain-service.service';
import { Router } from '@angular/router';
import { ExcelService } from '../services/excel.service';
import { Dessert } from '../painkiller/painkiller.component';
import { AddshippingDrugstoreComponent } from './add-shiping-agency/addshipping.component';
import { AddtrakingDrugstoreComponent } from './add-traking-modals/Addtraking.component';
import { ComposeMailBodyComponent } from '../allorder/compose-email-modal/composebody.component';

@Component({
  selector: 'app-drugstore',
  templateUrl: './drugstore.component.html',
  styleUrls: ['./drugstore.component.css']
})
export class DrugstoreComponent implements OnInit {

  searchKey: any;
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


  displayedColumns: string[] = ['inc', 'status', 'invid', 'date', 'phone', 'email', 'name', 'shsts', 'trck', 'oid'];
  listData: MatTableDataSource<any>;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    public painserv: PainServiceService,
    public dialog: MatDialog,
    public _router: Router,
    public snackBar: MatSnackBar,
    public excelService: ExcelService
  ) { 
    this.nor = true;
    if (this.painserv.login_check()) {
      this.status = true;
    } else {
      this._router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.painserv.postData(this.userData, "getrecordsdrugstore").then((result) => {
      this.resposeData = result;
      if (this.resposeData.status == "0") {
        this.nor = false;
      } else {
        this.listData = new MatTableDataSource(this.resposeData.userData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

        this.todayOrderi = this.resposeData.userData.length;
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
  }

  ExportTOExcel() {
    this.excelService.exportAsExcelFile(this.resposeData.userData, 'Drugstore');
  }


  onItemSelectStatus(item: any) {
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
    this.listData.filter = "";
    if (this.listData.filteredData.length > 0) {
      this.nor = true;
    } else {
      this.nor = false;
    }
    this.selItems = 0;
  }

  applyFilter() {
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

  onSearchClear() {
    this.listData.filter = "";
    this.searchKey = "";
    this.selItems = 0;
    this.nor = true;
  }


  deleteOrder(inx) {
    if (confirm("Are you sure to delete this Order?")) {
      this.loadSts = true;

      this.painserv.postData({ 'id': inx }, "dltDrugstoreOrder").then((result) => {
        this.resposeData = result;

        this.listData = new MatTableDataSource(this.resposeData.userData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.todayOrderi = this.resposeData.userData.length;

        this.loadSts = false;
      }, (err) => {
        //Connection failed message
      });
    }
  }

  

  /* Details Information open dialog function*/ 
  openDialog(inx): void {
    var array = this.resposeData.userData[inx];
    const dialogRef = this.dialog.open(DetailsDialogDrugstore, {
      width: '900px',
      data: { array: array }
    });

    //console.log(array);
    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  updateStatus(oid: any, pstsval: any) {
    let stsVal: any;
    const bottmSheet = this.dialog.open(OcStatusUpdateBottomSheetDrugstore, {
      width: '300px',
      data: { oid: oid, pstsval: pstsval, stsVal: stsVal }
    });

    bottmSheet.afterClosed().subscribe(result => {
      if (result) {
        this.loadSts = true;
        this.painserv.postData({ 'oid': oid, "statusval": result }, "updatestatusordrugstore").then((result) => {
          this.resposeData = result;

          this.listData = new MatTableDataSource(this.resposeData.userData);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;

          this.loadSts = false;
        }, (err) => {
          //Connection failed message
        });
      }
    });

  }


  
  addshipping(oid: any): void {
    var shipp: any;
    const addtrkmodal = this.dialog.open(AddshippingDrugstoreComponent, {
      width: '300px',
      data: { shipp: shipp }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
        this.loadSts = true;
        this.painserv.postData({ 'oid': oid, "shipp": result }, "addshippingdrugstore").then((result) => {
          this.resposeData = result;

          this.listData = new MatTableDataSource(this.resposeData.userData);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;

          this.loadSts = false;
        }, (err) => {
          //Connection failed message
        });
      }

    });
  }

  addTrakingid(oid: any): void {
    var tids = [{ "trakingid": "" }];
    const addtrkmodal = this.dialog.open(AddtrakingDrugstoreComponent, {
      width: '400px',
      data: { tids: tids }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
        this.loadSts = true;
        this.painserv.postData({ 'oid': oid, "trakingids": result }, "addtrakingiddrugstore").then((result) => {
          this.resposeData = result;

          this.listData = new MatTableDataSource(this.resposeData.userData);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;

          this.loadSts = false;
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }

  selctrow(row) {
    this.selectrow = row.inc;
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

  makecall(phn, country) {
    this.painserv.makecall(phn, country).then(res=> {
      console.log(res)
    })
  }

}



@Component({
  selector: 'detail-dialog-pain',
  templateUrl: 'detail-dialog.html',
  styleUrls: ['dialog.css']
})
export class DetailsDialogDrugstore {
  total: any;
  stslod = false;
  discount : any;
  subtot: any;
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogDrugstore>,
    @Inject(MAT_DIALOG_DATA) public data: Dessert,
    public dialog: MatDialog,
    public painserv: PainServiceService
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
    if(ptot>350) {
      if(ptot>600) {
        var dis = ptot*7/100;
      } else {
        var dis = 0;
      }
      this.discount = dis.toFixed(2);
      this.total = (ptot -dis).toFixed(2);
    } else {
      this.total = (ptot + 20).toFixed(2);
    }
  }

  addTraking(oid: any): void {
    var tids = [{ "trakingid": "" }];
    const addtrkmodal = this.dialog.open(AddtrakingDrugstoreComponent, {
      width: '400px',
      data: { tids: tids }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if(result) {
        this.painserv.postData({ 'oid': oid, "trakingids": result }, "addtrakingidpain").then((result) => {
          window.location.reload();
        }, (err) => {
          //Connection failed message
        });
      }
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

}



@Component({
  selector: 'or-status-update-pain',
  templateUrl: 'or-status-update.html',
  styleUrls: ['or-status-update.css']
})
export class OcStatusUpdateBottomSheetDrugstore {
  ststusList = [];
  statusVal: any;
  constructor(
    public dialogRef: MatDialogRef<OcStatusUpdateBottomSheetDrugstore>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

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

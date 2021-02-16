import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PainServiceService } from '../services/pain-service.service';
import { Dessert } from '../painkiller/painkiller.component';
import { AddtrakingManualOcComponent } from './add-traking-modals/Addtraking.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EditManulaOrderComponent } from './edit-manual-order/EditOrder.component';
import { ComposeMailBodyComponent } from '../allorder/compose-email-modal/composebody.component';


@Component({
  selector: 'app-manualorder',
  templateUrl: './manualorder.component.html',
  styleUrls: ['./manualorder.component.css']
})
export class ManualorderComponent implements OnInit {


  userdata = { "pname": "", "pqty": "", "ptot": "", "paymentsts": "", "cname": "", "cadd": "", "ccity": "", "cstate": "", "czip": "", "ccountry": "", "cemail": "", "cphone": "" };
  resposeData: any;
  selectrow: any;
  nor: boolean;
  loadSts = false;
  searchKey = "";
  selItems = 0;

  displayedColumns: string[] = ['inc', 'status', 'invid', 'date', 'phone', 'email', 'name', 'trck', 'oid'];
  listData: MatTableDataSource<any>;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public painserv: PainServiceService,
    public dialog: MatDialog,
    public _router: Router,
    public snackBar: MatSnackBar
  ) {
    this.nor = true;
    if (this.painserv.login_check()) {
    } else {
      this._router.navigate(['login']);
    }
    
  }

  ngOnInit() {

    this.painserv.postData(this.userdata, "allmanualorder").then((result) => {
      this.resposeData = result;
      if (this.resposeData.status == "0") {
        this.nor = false;
      } else {
        this.listData = new MatTableDataSource(this.resposeData.userData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    }, (err) => {
      //Connection failed message
    });

  }

  /* Details Information open dialog function*/
  openDialog(inx): void {
    var array = this.resposeData.userData[inx];
    const dialogRef = this.dialog.open(DetailsDialogManualOrder, {
      width: '700px',
      data: { array: array }
    });

    //console.log(array);
    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  openEditDialog(inx): void {
    var array = this.resposeData.userData[inx];
    const dialogRef = this.dialog.open(EditManulaOrderComponent, {
      width: '800px',
      data: { array: array },
      panelClass: 'editmanualoc'
    });

    //console.log(array);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.painserv.postData(result, "updatemanualoc").then((responce) => {
          console.log(responce);
          
        }, (err) => {
          //Connection failed message
        });
      }
    });
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


  updateStatus(oid: any, pstsval: any) {
    let stsVal: any;
    const bottmSheet = this.dialog.open(OcStatusUpdateBottomSheetManualOrder, {
      width: '300px',
      data: { oid: oid, pstsval: pstsval, stsVal: stsVal }
    });

    bottmSheet.afterClosed().subscribe(result => {
      if (result) {
        this.loadSts = true;
        this.painserv.postData({ 'oid': oid, "statusval": result }, "updatestatusmanualoc").then((result) => {
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

  deleteOrder(inx) {
    if (confirm("Are you sure to delete this Order?")) {
      this.loadSts = true;
      this.painserv.postData({ 'id': inx }, "dltManualOrder").then((result) => {
        this.resposeData = result;

        this.listData = new MatTableDataSource(this.resposeData.userData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.loadSts = false;
      }, (err) => {
        //Connection failed message
      });
    }
  }

  addTrakingid(oid: any): void {
    var tids = [{ "trakingid": "" }];
    const addtrkmodal = this.dialog.open(AddtrakingManualOcComponent, {
      width: '400px',
      data: { tids: tids }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
        this.loadSts = true;
        this.painserv.postData({ 'oid': oid, "trakingids": result }, "addtrakingidmanualoc").then((result) => {
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



  saveData() {
    if (this.userdata.cemail == "" || this.userdata.cphone=="") {
      Swal.fire('Oops...', 'Fill All Data and Then try again', 'error')
    } else {
      this.loadSts = true;
      window.scrollTo(0, 800);
      this.painserv.postData(this.userdata, "savemanualoc").then((result) => {
        this.resposeData = result;

        this.listData = new MatTableDataSource(this.resposeData.userData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

        this.loadSts = false;
        this.clearData();
        Swal.fire('Success', 'Manual Order Saved Successfully', 'success')
      }, (err) => {
        //Connection failed message
      });
    }
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
  

  clearData() {
    this.userdata = { "pname": "", "pqty": "", "ptot": "", "paymentsts": "", "cname": "", "cadd": "", "ccity": "", "cstate": "", "czip": "", "ccountry": "", "cemail": "", "cphone": "" };
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
  selector: 'detail-dialog-pain',
  templateUrl: 'detail-dialog.html',
  styleUrls: ['dialog.css']
})
export class DetailsDialogManualOrder {
  total: any;
  stslod = false;
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogManualOrder>,
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
      ptot = this.data.array.prname[i]['price'];

    }
    this.total = (Number(ptot) + 20).toFixed(2);
  }

  addTraking(oid: any): void {
    var tids = [{ "trakingid": "" }];
    const addtrkmodal = this.dialog.open(AddtrakingManualOcComponent, {
      width: '400px',
      data: { tids: tids }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
        this.painserv.postData({ 'oid': oid, "trakingids": result }, "addtrakingidmanualoc").then((result) => {
          window.location.reload();
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }

  resendTrakingid(oid) {
    this.stslod = true;
    this.painserv.postData({ 'oid': oid }, "rstrckingmailmanualoc").then((result) => {
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
export class OcStatusUpdateBottomSheetManualOrder {
  ststusList = [];
  statusVal: any;
  constructor(
    public dialogRef: MatDialogRef<OcStatusUpdateBottomSheetManualOrder>,
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

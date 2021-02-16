import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PainServiceService } from '../services/pain-service.service';
import { Router } from '@angular/router';
import { ExcelService } from '../services/excel.service';
import Swal from 'sweetalert2';
import { Dessert } from '../painkiller/painkiller.component';
import { AddshippingAllOrderComponent } from './add-shiping-agency/addshipping.component';
import { AddtrakingAllOrderComponent } from './add-traking-modals/Addtraking.component';
import { ComposeMailBodyComponent } from './compose-email-modal/composebody.component';
import { AddPaymentLinkModalComponent } from '../dashboard/add-payment-link-modal/addshipping.component';

@Component({
  selector: 'app-allorder',
  templateUrl: './allorder.component.html',
  styleUrls: ['./allorder.component.css']
})
export class AllorderComponent implements OnInit {
  selectrow: any;
  selected = 'd10';
  searchKey: any;
  resposeData: any;
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
  listDataLocal: MatTableDataSource<any>;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;




  constructor(
    public painserv: PainServiceService,
    public _router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
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
    this.painserv.postData({ 'method': this.selected }, "allorders").then((result) => {
      this.resposeData = result;
      if (this.resposeData.status == "0") {
        this.nor = false;
      } else {
        var arr = this.sortByDate(this.resposeData.userData);
        arr = this.getExistingcustomer(this.resposeData.userData);
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

  dataBind(val) {
    this.selected = val;
    this.loadSts = true;
    this.painserv.postData({ 'method': this.selected }, "allorders").then((result) => {
      this.resposeData = result;
      if (this.resposeData.status == "0") {
        this.nor = false;
      } else {
        var arr = this.sortByDate(this.resposeData.userData);
        arr = this.getExistingcustomer(this.resposeData.userData);
        this.listData = new MatTableDataSource(this.resposeData.userData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

        /* Reset MultiSelect */
        this.websiteSelectedItem = [];
        this.statausSelectedItem = [];
        this.selItems = 0;

        this.todayOrderi = this.resposeData.userData.length;
      }
      this.loadSts = false;
    }, (err) => {
      //Connection failed message
    });

  }



  ExportTOExcel() {
    this.excelService.exportAsExcelFile(this.resposeData.userData, 'AllOrder');
  }

  onItemSelectStatus(item: any) {
    this.listData = new MatTableDataSource(this.resposeData.userData);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;

    if (this.websiteSelectedItem.length > 0) {
      this.listData.filter = this.websiteSelectedItem[0].url;
      this.listDataLocal = new MatTableDataSource(this.listData.filteredData);
      this.listDataLocal.filter = item.item_text;
      this.listData = <any>this.listDataLocal.filteredData;

      this.currSelect = item.item_text;
      if (this.listDataLocal.filteredData.length == 0) {
        this.nor = false;
      } else {
        this.nor = true;
      }
      this.selItems = this.listDataLocal.filteredData.length;
    } else {
      this.currSelect = item.item_text;
      this.listData.filter = item.item_text;
      if (this.listData.filteredData.length == 0) {
        this.nor = false;
      } else {
        this.nor = true;
      }
      this.selItems = this.listData.filteredData.length;
    }
  }


  onDeselectStatus(items: any) {
    this.listData = new MatTableDataSource(this.resposeData.userData);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;

    if (this.websiteSelectedItem.length > 0) {
      this.listData.filter = this.websiteSelectedItem[0].url;
      this.currSelect = "";
      if (this.listData.filteredData.length > 0) {
        this.nor = true;
      } else {
        this.nor = false;
      }
      this.selItems = 0;
      this.selItems = this.listData.filteredData.length;
    } else {

      this.currSelect = "";
      this.listData.filter = "";
      if (this.listData.filteredData.length > 0) {
        this.nor = true;
      } else {
        this.nor = false;
      }
      this.selItems = 0;
    }
  }





  onItemSelectWebsite(item: any) {
    this.listData = new MatTableDataSource(this.resposeData.userData);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;

    if (this.statausSelectedItem.length > 0) {
      this.listData.filter = this.statausSelectedItem[0].item_text;
      this.listDataLocal = new MatTableDataSource(this.listData.filteredData);
      this.listDataLocal.filter = item.url;
      this.listData = <any>this.listDataLocal.filteredData;

      this.currSelect = item.url;
      if (this.listDataLocal.filteredData.length == 0) {
        this.nor = false;
      } else {
        this.nor = true;
      }
      this.selItems = this.listDataLocal.filteredData.length;
    } else {
      this.currSelect = item.url;
      this.listData.filter = item.url;
      if (this.listData.filteredData.length == 0) {
        this.nor = false;
      } else {
        this.nor = true;
      }
      this.selItems = this.listData.filteredData.length;
    }
  }


  onDeselectWebsite(items: any) {
    this.listData = new MatTableDataSource(this.resposeData.userData);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;

    if (this.statausSelectedItem.length > 0) {
      this.listData.filter = this.statausSelectedItem[0].item_text;
      this.currSelect = "";
      if (this.listData.filteredData.length > 0) {
        this.nor = true;
      } else {
        this.nor = false;
      }
      this.selItems = this.listData.filteredData.length;
    } else {
      this.currSelect = "";
      this.listData.filter = "";
      if (this.listData.filteredData.length > 0) {
        this.nor = true;
      } else {
        this.nor = false;
      }
      this.selItems = 0;
    }
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

  onSearchClear() {
    this.currSelect = "";
    this.listData.filter = "";
    this.searchKey = "";
    this.selItems = 0;
    this.nor = true;
  }

  deleteOrder(inx, web) {
    if (confirm("Are you sure to delete this Order?")) {
      this.loadSts = true;
      this.painserv.postData({ 'id': inx, 'web': web, 'method': this.selected }, "dltAllOrders").then((result) => {
        this.resposeData = result;
        var arr = this.sortByDate(this.resposeData.userData);
        arr = this.getExistingcustomer(this.resposeData.userData);
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

  openDialog(inx): void {
    var array = this.singleArrReturnByVal(this.resposeData.userData, inx);
    //console.log(arr, inx);
    //var array = this.resposeData.userData[inx];
    const dialogRef = this.dialog.open(AllOrderDetailsDialog, {
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


  updateStatus(oid: any, pstsval: any, web: any) {
    let stsVal: any;
    const bottmSheet = this.dialog.open(AllOrderStatusUpdateDialog, {
      width: '300px',
      data: { oid: oid, pstsval: pstsval, stsVal: stsVal, web: web }
    });

    bottmSheet.afterClosed().subscribe(result => {
      if (result) {
        this.loadSts = true;
        this.painserv.postData({ 'oid': oid, "statusval": result, "web": web, 'method': this.selected }, "updatestatusalloc").then((result) => {
          this.resposeData = result;
          var arr = this.sortByDate(this.resposeData.userData);
          arr = this.getExistingcustomer(this.resposeData.userData);
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
    const addtrkmodal = this.dialog.open(AddshippingAllOrderComponent, {
      width: '300px',
      data: { shipp: shipp }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
        this.loadSts = true;
        this.painserv.postData({ 'oid': oid, "shipp": result, 'web': web, 'method': this.selected }, "addshippingtalloc").then((result) => {
          this.resposeData = result;
          var arr = this.sortByDate(this.resposeData.userData);
          arr = this.getExistingcustomer(this.resposeData.userData);
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
    const addtrkmodal = this.dialog.open(AddtrakingAllOrderComponent, {
      width: '500px',
      data: { tids: tids }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
        this.loadSts = true;
        this.painserv.postData({ 'oid': oid, "trakingids": result, "web": web, 'method': this.selected }, "addtrakingidtalloc").then((result) => {
          this.resposeData = result;
          var arr = this.sortByDate(this.resposeData.userData);
          arr = this.getExistingcustomer(this.resposeData.userData);
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

  getExistingcustomer(data) {
    var arr = [];
    var arr2 = [];
    for (let i = 0; i < data.length; i++) {
      if (arr.includes(data[i].email)) {
        // data[i]['existcust'] = data[i].email;
        var inx = arr.indexOf(data[i].email);
        inx = arr2[inx];
        data[inx]['existcust'] = data[i].email;
      } else {
        arr.push(data[i].email);
        arr2.push(i);
      }
    }
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

  composeEmail(email, web) {
    const composemail = this.dialog.open(ComposeMailBodyComponent, {
      width: '800px',
      data: { subject: "", body: "" }
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


  selctrow(row) {
    this.selectrow = row.inc;
  }

  makecall(phn, country) {
    this.painserv.makecall(phn, country).then(res=> {
      console.log(res)
    })
  }

  reorderemailsend(data) {
    if (confirm("Are you sure to send mail to the customer for reorder of medication?")) {
      this.loadSts = true;
      this.painserv.postData(data, "reorderemailsend").then((result) => {
        this.loadSts = false;
      }, (err) => {
        //Connection failed message
      });
    }
  }

}




@Component({
  selector: 'detail-dialog',
  templateUrl: 'detail-dialog.html',
  styleUrls: ['dialog.css']
})
export class AllOrderDetailsDialog {
  total: any;
  stslod = false;
  paylinksts = false;
  discount: any;
  subtot: any;
  editorder = false;
  edit_pname: any;
  edit_qty: any;
  edit_price: any;
  edit_tot: any;
  constructor(

    public dialogRef: MatDialogRef<AllOrderDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Dessert,
    public dialog: MatDialog,
    public painserv: PainServiceService,
    public alloc: AllorderComponent,
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
    var tids = [{ "trakingid": "", "trakinglink": "" }];
    const addtrkmodal = this.dialog.open(AddtrakingAllOrderComponent, {
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

        this.painserv.postData({ 'oid': oid, "trakingids": result, "web": web, 'method': this.alloc.selected }, "addtrakingidtoc").then((result) => {
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

    const addtrkmodal = this.dialog.open(AddtrakingAllOrderComponent, {
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
          alert("Link Saved!, Mail send to customer");
          data.pay_link = result;
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }

  updatepaymentlink(data): void {
    const addtrkmodal = this.dialog.open(AddPaymentLinkModalComponent, {
      width: '300px',
      data: { shipp: data.pay_link }
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

  reorder() {
    this.editorder = true;
    var arrlength = (this.data.array.prname.length - 1);
    this.edit_pname = this.data.array.prname[arrlength]['pname'];
    this.edit_qty = this.data.array.prname[arrlength]['qty'];
    this.edit_tot = this.data.array.prname[arrlength]['qty'] * this.data.array.prname[arrlength]['price'];
    if (this.data.array.web == "Manualorder") {
      this.edit_tot = this.data.array.prname[arrlength]['price'];
    }
  }

  reodersave() {
    var userdata = { "pname": "", "pqty": "", "ptot": "", "paymentsts": "", "cname": "", "cadd": "", "ccity": "", "cstate": "", "czip": "", "ccountry": "", "cemail": "", "cphone": "" };
    userdata.pname = this.edit_pname;
    userdata.pqty = this.edit_qty;
    userdata.ptot = this.edit_tot;
    userdata.paymentsts = "Pending";
    userdata.cname = this.data.array.name;
    userdata.cadd = this.data.array.address;
    userdata.ccity = this.data.array.city;
    userdata.cstate = this.data.array.state;
    userdata.czip = this.data.array.zip;
    userdata.ccountry = this.data.array.country;
    userdata.cemail = this.data.array.email;
    userdata.cphone = this.data.array.phone;
    let _snkbr = this.snackBar.open("Adding.....", "Please Wait", {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });

    this.painserv.postData(userdata, "savemanualoc").then((result) => {
      _snkbr.dismiss();
      Swal.fire('Success', 'Manual Order Saved Successfully', 'success')
      window.location.reload();
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
export class AllOrderStatusUpdateDialog {
  ststusList = [];
  statusVal: any;
  constructor(
    public dialogRef: MatDialogRef<AllOrderStatusUpdateDialog>,
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

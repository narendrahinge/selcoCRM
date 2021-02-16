import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PainServiceService } from '../services/pain-service.service';
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { CaseDetailsComponent } from './case-details-dialog/casedetails.component';
import { ComposeMailBodyComponent } from '../allorder/compose-email-modal/composebody.component';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {
  oid: any;
  searchKey: any;
  selectrow: any;
  searchKeyclose: any;
  searchKeycustrep: any;
  messageBody: any;
  responcedata: any;
  selweb: any;
  total: any;
  discount: any;
  subtot: any;
  issuebrif = "";
  issue = "";
  loadSts = false;
  loadcompleted = false;
  imshow = false;
  nor = true;
  nor2 = true;
  nor3 = true;

  responceDataOid: any;
  fetcharr = { 'invid': '', 'name': '', 'address': '', 'email': '', 'cno': '', 'prname': '', 'web': '', 'date': '' };
  selissue = "I have not received tracking Id yet.";

  websiteList = [
    { inx: 1, url: 'painkillermedicines.com' },
    { inx: 2, url: 'globalpharmamedicines.com' },
    { inx: 3, url: 'drugstoreplanet.com' },
    { inx: 4, url: 'ordercypionate.com' },
    { inx: 5, url: 'tramadolexport.com' },
    { inx: 6, url: 'tramadolsale.com' },
    { inx: 7, url: 'buyanxietymedicines.com' },
    { inx: 8, url: 'bytramadolonlinecod.com' },
    { inx: 9, url: 'Manualorder' }
  ];

  displayedColumnsopencases: string[] = ['id', 'web', 'case_id', 'orderid', 'date', 'name', 'email', 'issue', 'timestamp'];

  openCasesData: MatTableDataSource<any>;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openCasesPaginator', {read: MatPaginator}) paginator: MatPaginator;

  closeCasesData: MatTableDataSource<any>;
  @ViewChild('TABLE2') table2: ElementRef;
  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild('closeCasesPaginator', {read: MatPaginator}) paginator2: MatPaginator;

  displayedColumnscustrep: string[] = ['id', 'web', 'order_id', 'timestamp','cname', 'cno', 'issue', 'status'];
  fetchcustRepData: MatTableDataSource<any>;
  @ViewChild('TABLE3') table3: ElementRef;
  @ViewChild(MatSort) sort3: MatSort;
  @ViewChild('custRepPaginator', {read: MatPaginator}) paginator3: MatPaginator;

  constructor(
    private painserv: PainServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.issue = this.selissue;
  }

  ngOnInit() {
    this.allopencases();
  }

  tabClick(tab) {
    switch (tab.index) {
      case 0:
        this.allopencases();
        break;

      case 1:
        this.allclosedcases();
        break;

      case 2:
        this.fetchcustreports();
        break;
    }
  }


  allopencases() {
    this.painserv.postData({}, "getallopencases").then((result) => {
      let localdata: any = result;
      if (localdata.status == 0) {
        this.nor = false;
      } else {
        this.openCasesData = new MatTableDataSource(localdata.userData);
        this.openCasesData.sort = this.sort;
        this.openCasesData.paginator = this.paginator;
        this.nor = true;
      }
    }, (err) => {
      //Connection failed message
    });
  }

  allclosedcases() {
    this.painserv.postData({}, "getallclosedcases").then((result) => {
      let localdata: any = result;
      if (localdata.status == 0) {
        this.nor2 = false;
      } else {
        this.nor2 = true;
        this.closeCasesData = new MatTableDataSource(localdata.userData);
        this.closeCasesData.sort = this.sort2;
        this.closeCasesData.paginator = this.paginator2;
      }
    }, (err) => {
      //Connection failed message
    });
  }

  fetchcustreports() {
    this.painserv.postData({}, "fetchcustreports").then((result) => {
      let localdata: any = result;
      if (localdata.status == 0) {
        this.nor3 = false;
      } else {
        this.fetchcustRepData = new MatTableDataSource(localdata.userData);
        this.fetchcustRepData.sort = this.sort3;
        this.fetchcustRepData.paginator = this.paginator3;
        this.nor3 = true;
      }
    }, (err) => {
      //Connection failed message
    });
  }

  openDialog_opencase(case_id): void {
    var arr = this.singleArrReturnByVal(this.openCasesData.filteredData, case_id);
    const dialogRef = this.dialog.open(CaseDetailsComponent, {
      width: '850px',
      data: { "array": arr }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  openDialog_closecase(case_id): void {
    var arr = this.singleArrReturnByVal(this.closeCasesData.filteredData, case_id);
    const dialogRef = this.dialog.open(CaseDetailsComponent, {
      width: '850px',
      data: { "array": arr }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  applyFilter() {
    if (this.openCasesData) {
      this.openCasesData.filter = this.searchKey;
      if (this.openCasesData.filteredData.length == 0) {
        this.nor = false;
      } else {
        this.nor = true;
      }
    }
  }

  applyFilterclosecase() {
    if (this.closeCasesData) {
      this.closeCasesData.filter = this.searchKeyclose;
      if (this.closeCasesData.filteredData.length == 0) {
        this.nor2 = false;
      } else {
        this.nor2 = true;
      }
    }
  }

  applyFiltercustreport() {
    if (this.fetchcustRepData) {
      this.fetchcustRepData.filter = this.searchKeycustrep;
      if (this.fetchcustRepData.filteredData.length == 0) {
        this.nor3 = false;
      } else {
        this.nor3 = true;
      }
    }
  }

  onSearchClear() {
    this.openCasesData.filter = '';
    this.searchKey = "";
    this.nor = true;
  }

  onSearchClearclosecase() {
    this.openCasesData.filter = '';
    this.searchKeyclose = "";
    this.nor2 = true;
  }
  onSearchClearcustreport() {
    this.fetchcustRepData.filter = '';
    this.searchKeycustrep = "";
    this.nor3 = true;
  }

  singleArrReturnByVal(arr, val) {
    var carr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].case_id == val) {
        carr = arr[i];
      }
    }
    return carr;
  }


  processiod(oid, web) {
    if (web && oid) {
      let _snkbr = this.snackBar.open("Loading....", " ", {
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      this.painserv.postData({ 'oid': oid, "web": web }, "fetchsingleorderdetails").then((result) => {
        this.responceDataOid = result;
        _snkbr.dismiss();
        if (this.responceDataOid.status == 1) {
          this.fetcharr = this.responceDataOid.userData;
          this.calculateTotal();
          this.loadcompleted = true;
        } else {
          let _snkbr = this.snackBar.open("FAILED! Enter Correct Order ID", "CLOSE", {
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      }, (err) => {
        //Connection failed message
      });
    } else {
      let _snkbr = this.snackBar.open("Select Website OR Enter Valid Order ID", "CLOSE", {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }

  calculateTotal() {
    var ptot = 0;
    for (let i = 0; i < this.fetcharr.prname.length; i++) {
      var qty = this.fetcharr.prname[i]['qty'];
      var price = this.fetcharr.prname[i]['price'];
      ptot = ptot + Number(qty * price);
    }
    this.subtot = ptot.toFixed(2);
    this.total = ptot;
    if (this.total > 350) {
      if (this.total > 600) {
        var dis = ptot * 7 / 100;
      } else {
        var dis = 0;
      }
      this.discount = dis.toFixed(2);
      this.total = (ptot - dis).toFixed(2);
    } else {
      this.total = (ptot + 20).toFixed(2);
    }

    if (this.fetcharr.web == "Manualorder") {
      this.total = (Number(this.fetcharr.prname[0]['price']) + 20).toFixed(2);
    }
  }

  custonissuetoggle(val) {
    if (val == "diff_issue") {
      this.imshow = true;
    } else {
      this.imshow = false;
    }
  }

  createCase(arr) {
    if (this.selissue == "diff_issue") {
      this.issue = this.issuebrif;
    } else {
      this.issue = this.selissue;
    }
    let _snkbr = this.snackBar.open("Loading....", " ", {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    this.painserv.postData({ "arr": arr, "issue": this.issue }, "createannewcase").then((result) => {
      this.responceDataOid = result;
      _snkbr.dismiss();
      if (this.responceDataOid.status == 1) {
        window.location.reload();
      } else {
        let _snkbr = this.snackBar.open("FAILED! Won't Create the Case", "CLOSE", {
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    }, (err) => {
      //Connection failed message
    });
  }


  deletecases(id) {
    if (confirm("Are you sure to permanent delete this order?")) {
      this.painserv.postData({ 'id': id }, "deletecases").then((result) => {
        this.responceDataOid = result;

        if (this.responceDataOid.status == 1) {
          this.closeCasesData = new MatTableDataSource(this.responceDataOid.userData);
          this.closeCasesData.sort = this.sort;
          this.closeCasesData.paginator = this.paginator;
          this.nor2 = true;
        } else {
          this.closeCasesData = new MatTableDataSource([]);
          this.nor2 = false;
        }
      }, (err) => {
        //Connection failed message
      });
    }
  }

  changecasests(id) {
    if (confirm("Are you sure to close these case?")) {
      this.painserv.postData({ 'id': id }, "changestatuscase").then((result) => {
        this.responceDataOid = result;

        if (this.responceDataOid.status == 1) {
          this.openCasesData = new MatTableDataSource(this.responceDataOid.userData);
          this.openCasesData.sort = this.sort;
          this.openCasesData.paginator = this.paginator;
          this.nor = true;
        } else {
          this.openCasesData = new MatTableDataSource([]);
          this.nor = false;
        }
      }, (err) => {
        //Connection failed message
      });
    }
  }

  reopenchangecasests(id) {
    if (confirm("Are you sure to open this case again?")) {
      this.painserv.postData({ 'id': id }, "reopencasestatus").then((result) => {
        let localvar: any = result;
        if (localvar.status == 1) {
          this.closeCasesData = new MatTableDataSource(localvar.userData);
          this.closeCasesData.sort = this.sort2;
          this.closeCasesData.paginator = this.paginator2;
          this.nor2 = true;
        } else {
          this.closeCasesData = new MatTableDataSource([]);
          this.nor2 = false;
        }
      }, (err) => {
        //Connection failed message
      });
    }
  }

  deletecustreport(id) {
    if (confirm("Are you sure to delete this customer report?")) {
      this.painserv.postData({ 'id': id }, "dltcustreport").then((result) => {
        let localdata: any = result;
        if (localdata.status == 0) {
          this.nor3 = false;
        } else {
          this.fetchcustRepData = new MatTableDataSource(localdata.userData);
          this.fetchcustRepData.sort = this.sort3;
          this.fetchcustRepData.paginator = this.paginator3;
          this.nor3 = true;
        }
      }, (err) => {
        //Connection failed message
      });
    }
  }

  changecustissuestatus(id) {
    if (confirm("Are you sure to change this report status?")) {
      this.painserv.postData({ 'id': id }, "changecustreportsts").then((result) => {
        let localdata: any = result;
        if (localdata.status == 0) {
          this.nor3 = false;
        } else {
          this.fetchcustRepData = new MatTableDataSource(localdata.userData);
          this.fetchcustRepData.sort = this.sort3;
          this.fetchcustRepData.paginator = this.paginator3;
          this.nor3 = true;
        }
      }, (err) => {
        //Connection failed message
      });
    }
  }

  composeEmail(email, web) {
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
    this.selectrow = row.id;
  }

  sendmessage(id) {
    let _snkbr = this.snackBar.open("Sending.....", "Please Wait", {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    this.painserv.postData({ 'id':id, 'msg':this.messageBody }, "replycustreport").then((reponce) => {
     this.messageBody = '';
     this.responcedata = reponce;
     this.fetchcustRepData = new MatTableDataSource(this.responcedata.userData);
     this.fetchcustRepData.sort = this.sort;
     this.fetchcustRepData.paginator = this.paginator;

     _snkbr.dismiss();
     this.snackBar.open("Message Sent", "DISMISS", {
       duration: 2000,
       verticalPosition: 'top',
       horizontalPosition: 'center'
     });
    }, (err) => {
      //Connection failed message
    });
  }


}

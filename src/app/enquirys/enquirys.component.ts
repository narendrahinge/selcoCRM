import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PainServiceService } from '../services/pain-service.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ExcelService } from '../services/excel.service';
import { ComposeMailBodyComponent } from '../allorder/compose-email-modal/composebody.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enquirys',
  templateUrl: './enquirys.component.html',
  styleUrls: ['./enquirys.component.css']
})
export class EnquirysComponent implements OnInit {
  responcedata: any;
  nor: boolean;
  searchKey: string;
  selectrow: any;
  messageBody: any;

  displayedColumns: string[] = ['id', 'web', 'name', 'timestamp', 'email', 'cno', 'msg', 'status'];
  data: MatTableDataSource<any>;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(
    public painserv: PainServiceService,
    public dialog: MatDialog,
    public _router: Router,
    public excelService: ExcelService,
    private snackBar: MatSnackBar,
  ) { 
    this.nor = true;
    if (this.painserv.login_check()) {
    } else {
      this._router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.painserv.postData({}, "getallenquiries").then((result) => {
      this.responcedata = result;
      if (this.responcedata.status == "0") {
        this.nor = false;
      } else {
        //this.data = this.responcedata.userData;
        this.data = new MatTableDataSource(this.responcedata.userData);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;
      }

    }, (err) => {
      //Connection failed message
    });
  }

  deleteenquiry(id) {
    if (confirm("Are you sure to delete this Enquiry?")) {
      this.painserv.postData({ 'id': id, }, "dltenquiries").then((result) => {
        this.responcedata = result;
        this.data = new MatTableDataSource(this.responcedata.userData);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;

      }, (err) => {
        //Connection failed message
      });
    }
  }

  changenquirysts(id) {
    if (confirm("Are you sure to complete this Enquiry?")) {
      this.painserv.postData({ 'id': id, }, "changestsenquiry").then((result) => {
        this.responcedata = result;
        this.data = new MatTableDataSource(this.responcedata.userData);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;

      }, (err) => {
        //Connection failed message
      });
    }
  }

  applyFilter() {
    if (this.data) {
      this.data.filter = this.searchKey;
      if (this.data.filteredData.length == 0) {
        this.nor = false;
      } else {
        this.nor = true;
      }
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.data.filter = '';
    this.nor = true;
  }

  selctrow(row) {
    this.selectrow = row.id;
  }

  sendmessage(id) {
    let _snkbr = this.snackBar.open("Sending.....", "Please Wait", {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    this.painserv.postData({ 'id':id, 'msg':this.messageBody }, "replyenquiry").then((reponce) => {
     this.messageBody = '';
     this.responcedata = reponce;
     this.data = new MatTableDataSource(this.responcedata.userData);
     this.data.sort = this.sort;
     this.data.paginator = this.paginator;

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


  composeEmail(email,  uname) {
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

        this.painserv.postData({ 'email': email, "web": 'tramadolexport.com', "subject": result.subject, 'body': result.body }, "allocsendcomposemail").then((reponce) => {
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

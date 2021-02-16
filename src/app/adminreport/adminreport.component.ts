import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PainServiceService } from '../services/pain-service.service';
import { Router } from '@angular/router';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-adminreport',
  templateUrl: './adminreport.component.html',
  styleUrls: ['./adminreport.component.css']
})
export class AdminreportComponent implements OnInit {

  responcedata: any;
  nor: boolean;
  searchKey: string;
  selectrow: any;
  messageBody: any;

  displayedColumns: string[] = ['id', 'timestamp', 'username',  'comment', 'status'];
  data: MatTableDataSource<any>;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    public painserv: PainServiceService,
    public dialog: MatDialog,
    public _router: Router,
    public excelService: ExcelService,
    private snackBar: MatSnackBar
  ) {
    this.nor = true;
    if (this.painserv.login_check()) {
    } else {
      this._router.navigate(['login']);
    }
  }

  

  ngOnInit() {
    this.painserv.postData({}, "getalladmincomments").then((result) => {
      this.responcedata = result;
      if (this.responcedata.status == "0") {
        this.nor = false;
      } else {
        //this.data = this.responcedata.userData;
        this.data = new MatTableDataSource(this.responcedata.userData);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;
        if(this.data.filteredData.length == 0) {
          this.nor = false;
        }
      }

    }, (err) => {
      //Connection failed message
    });
  }

  createnewmsg() {
    var datas = { 'name': '', 'issue': ''}
    const bottmSheet = this.dialog.open(AdminReprtDialog, {
      width: '500px',
      data: datas
    });

    bottmSheet.afterClosed().subscribe(result => {
      this.snackBar.open("Saveing...", "Please Wait", {
        duration: 2000,
      });
      if (result) {
        this.painserv.postData(result, "adminreportadd").then((res: any) => {
         if(res.status==1) {
          this.data = new MatTableDataSource(res.userData);
          this.data.sort = this.sort;
          this.data.paginator = this.paginator;

          this.snackBar.dismiss();
         }
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }


  sendmessage(id) {
    let _snkbr = this.snackBar.open("Sending.....", "Please Wait", {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    this.painserv.postData({ 'id': id, 'msg': this.messageBody }, "replyeadmincommentsadmin").then((reponce) => {
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



  selctrow(row) {
    this.selectrow = row.id;
  }

  deletefullmsg(id) {
    if(confirm("Are you sure want to delete this message?")) {
      this.painserv.postData({ 'id': id, 'msg': this.messageBody }, "deleteadmincomments").then((reponce) => {
        this.messageBody = '';
        this.responcedata = reponce;
        this.data = new MatTableDataSource(this.responcedata.userData);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;
        if(this.data.filteredData.length == 0) {
          this.nor = false;
        }
      }, (err) => {
        //Connection failed message
      });
    }
  }


}



@Component({
  selector: 'model-admin-rep',
  templateUrl: 'model-admin-rep.html',
  styleUrls: ['model-admin-rep.css']
})
export class AdminReprtDialog {
  ststusList = [];
  statusVal: any;
  constructor(
    public dialogRef: MatDialogRef<AdminReprtDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


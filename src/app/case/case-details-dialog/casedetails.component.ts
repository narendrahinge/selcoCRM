import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AddtrakingAllCaseComponent } from '../add-traking-modals/Addtraking.component';
import { PainServiceService } from 'src/app/services/pain-service.service';


@Component({
  selector: 'case-details-dialog',
  templateUrl: 'case-details-dialog.html',
  styleUrls: ['case-details-dialog.css']
})
export class CaseDetailsComponent {

  total: any;
  discount: any;
  subtot: any;
  responcedata: any;
  togglediv = false;
  notetext:any;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public painserv: PainServiceService,
    public dialogRef: MatDialogRef<CaseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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

    if (this.data.array.web == "Manualorder") {
      this.total = (Number(this.data.array.prname[0]['price']) + 20).toFixed(2);
    }

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addTraking(oid: any): void {
    var tids = [{ "trakingid": "" }];
    const addtrkmodal = this.dialog.open(AddtrakingAllCaseComponent, {
      width: '300px',
      data: { tids: tids }
    });

    addtrkmodal.afterClosed().subscribe(result => {
      if (result) {
         let _snkbr = this.snackBar.open("Adding...", "Please Wait", {
           verticalPosition: 'top',
           horizontalPosition: 'center'
         });
        this.painserv.postData({ 'oid': oid, "trakingids": result }, "addreshiptrakingscase").then((resultres) => {
          _snkbr.dismiss();
          this.snackBar.open("Successfully Add", "SUCCESS", {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          window.location.reload();
        }, (err) => {
          //Connection failed message
        });
      }
    });
  }

  resendTrakingidcases(oid) {
    let _snkbr = this.snackBar.open("Sending...", "Please Wait", {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    this.painserv.postData({ 'oid': oid}, "rtrakingmailcases").then((result) => {
      _snkbr.dismiss();
    }, (err) => {
      //Connection failed message
    });
  }

  togglenote() {
    if(this.togglediv) {
      this.togglediv = false;;
    } else {
      this.togglediv = true;
    }
  }
  addnote(id) {
    if(this.notetext) {
      let _snkbr = this.snackBar.open("Adding...", "", {
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      this.painserv.postData({ 'id': id, 'note':this.notetext}, "addcasenote").then((result:any) => {
        _snkbr.dismiss();
        this.data.array.note.push({"id":result.userData, "order_id":this.data.array.id, "case_note":this.notetext})
        this.notetext = "";
      }, (err) => {
        //Connection failed message
      });
    }
  }

  deletenote(id, i) {
    if(confirm("Are you sure want to delete this note?")) {
      this.painserv.postData({ 'id': id}, "delcasenote").then((result) => {
        this.data.array.note.splice(i, 1); 
      }, (err) => {
        //Connection failed message
      });
    }
  }


}
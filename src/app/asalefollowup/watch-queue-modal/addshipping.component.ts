import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PainServiceService } from 'src/app/services/pain-service.service';
import { CallModalComponent } from '../call-modal/callmodal.component';

@Component({
  selector: 'watch-queue-modal',
  templateUrl: 'watch-queue-modal.html',
  styleUrls: ['watch-queue-modal.css']
})
export class WatchqueueComponent {
  currval: any;
  actuallist = [];
  curritem = 0;
  autocall = true;
  constructor(
    public dialogRef: MatDialogRef<WatchqueueComponent>,
    public dialog: MatDialog,
    public painserv: PainServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    for (let i = 0; i < data.array.length; i++) {
      if (data.array[i].status != data.array[i].detailsarr.status) {
        this.actuallist.push(data.array[i]);
      }
    }

    this.currval = this.actuallist[this.curritem];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getcurrrecords(rec) {
    this.currval = rec;
  }

  startcall(data) {
    this.painserv.makecall(data.detailsarr.phone, data.detailsarr.country).then(res=> {
      if(res) {
       
      }
    })
    const dialogRef = this.dialog.open(CallModalComponent, {
      width: '850px',
      data: { array: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.curritem += 1;
      this.autocallingenable();
    });
  }

  autocallingenable() {
    if (this.autocall) {
      if(this.curritem < this.actuallist.length) {
        this.painserv.makecall(this.actuallist[this.curritem].detailsarr.phone, this.actuallist[this.curritem].detailsarr.country).then(res=> {
          if(res) {
           
          }
        })
        const dialogRef = this.dialog.open(CallModalComponent, {
          width: '850px',
          data: { array: this.actuallist[this.curritem] }
        });
  
        dialogRef.afterClosed().subscribe(result => {
          this.curritem += 1;
          this.autocallingenable();
        });
      } else {
        this.dialogRef.close();
      }
    }
  }
}
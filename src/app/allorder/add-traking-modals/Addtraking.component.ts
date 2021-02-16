import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA} from '@angular/material';
import { PainServiceService } from 'src/app/services/pain-service.service';

@Component({
    selector: 'add-traking-modal',
    templateUrl: 'add-traking-modal.html',
    styleUrls: ['add-traking-modal.css']
  })
  export class AddtrakingAllOrderComponent {
    constructor(
      public painserv: PainServiceService,
      private snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<AddtrakingAllOrderComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
      ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    add(tids) {
        tids.push({ "trakingid": "", "trakinglink": "" });
    }

    deltracking(data, i, id, web) {
       data.splice(i, 1);
        this.painserv.postData({ 'oid': id, 'web':web }, "deltrackingids").then((result) => {
          this.snackBar.open("Successfully Deleted", "close", {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });
        }, (err) => {
          //Connection failed message
        });
    }

    
    
  
  }
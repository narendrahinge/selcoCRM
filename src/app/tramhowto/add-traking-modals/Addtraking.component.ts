import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'add-traking-modal',
    templateUrl: 'add-traking-modal.html',
    styleUrls: ['add-traking-modal.css']
  })
  export class AddtrakingTramhowtoComponent {
    constructor(
      public dialogRef: MatDialogRef<AddtrakingTramhowtoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    add(tids) {
        tids.push({"trakingid": ""});
    }

  
  }
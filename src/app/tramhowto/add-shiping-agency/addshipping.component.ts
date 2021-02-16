import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'add-shipping-modal',
    templateUrl: 'add-shipping-modal.html',
    styleUrls: ['add-shipping-modal.css']
  })
  export class AddshippingTramhowto {
    constructor(
      public dialogRef: MatDialogRef<AddshippingTramhowto>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
 
  
  }
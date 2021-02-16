import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'add-payment-modal',
    templateUrl: 'add-payment-modal.html',
    styleUrls: ['add-payment-modal.css']
  })
  export class AddPaymentLinkModalComponent {
    constructor(
      public dialogRef: MatDialogRef<AddPaymentLinkModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
 
  
  }
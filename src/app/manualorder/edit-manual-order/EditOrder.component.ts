import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'edit-manual-order',
    templateUrl: 'edit-manual-order.html',
    styleUrls: ['edit-manual-order.css']
  })
  export class EditManulaOrderComponent {
    constructor(
      public dialogRef: MatDialogRef<EditManulaOrderComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    

  }
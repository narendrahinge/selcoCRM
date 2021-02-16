import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularEditorConfig } from '@sedlan/angular-edit';

@Component({
    selector: 'compose-email',
    templateUrl: 'compose-email.html',
    styleUrls: ['compose-email.css']
  })
  export class ComposeMailBodyComponent {
    
    editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '25rem',
      minHeight: '5rem',
      placeholder: 'Email Body.....',
      translate: 'no',
      uploadUrl: 'https://www.selcoenterprises.com/CRM/image.php', // if needed
      customClasses: [ // optional
        {
          name: "quote",
          class: "quote",
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: "titleText",
          class: "titleText",
          tag: "h1",
        },
      ]
    };

    constructor(
      public dialogRef: MatDialogRef<ComposeMailBodyComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }

  }
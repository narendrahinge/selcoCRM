import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PainServiceService } from 'src/app/services/pain-service.service';

@Component({
  selector: 'callmodal',
  templateUrl: 'callmodal.html',
  styleUrls: ['callmodal.css']
})
export class CallModalComponent {
  ststusList: any;
  constructor(
    public dialogRef: MatDialogRef<CallModalComponent>,
    public painserv: PainServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ststusList = [
      { item_id: 1, item_text: 'NA' },
      { item_id: 2, item_text: 'Processed' },
      { item_id: 3, item_text: 'Shipped' },
      { item_id: 4, item_text: 'Tracking' },
      { item_id: 5, item_text: 'Delivered' },
      { item_id: 6, item_text: 'Undelivered' }
    ];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  statuschange(oid, sts, noc) {
    if (sts == "Delivered" || sts == "Undelivered") {
      if (confirm("Are you sure want to make this order " + sts + " beacause when you change status to " + sts + " order remove from followup section?")) {
        this.painserv.postData({ 'oid': oid, "statusval": sts }, "changestsfollowupoc").then((result) => {
            window.location.reload();
        }, (err) => {
          //Connection failed message
        });
      
      }
    } else {
      if(sts=="Processed") {
        noc[0] = noc[0]+1;
      } else if(sts=="Shipped") { 
        noc[1] = noc[1]+1;
      } else if(sts=="Tracking") {
        noc[2] = noc[2]+1;
      } else if(sts=="Delivered") {
        noc[3] = noc[3]+1;
      }

      this.painserv.postData({ 'oid': oid, "statusval": sts }, "changestsfollowupoc").then((result) => {

      }, (err) => {
        //Connection failed message
      });
    }
    this.dialogRef.close();
  }


  callback(id, sts, noc) {
    let nxsts: any;
    for (let i = 0; i < this.ststusList.length; i++) {
      if (this.ststusList[i].item_text == sts) {
        nxsts = this.ststusList[i + 1].item_text;
      }
    }
    
    if(nxsts=="Processed") {
      noc[0] = noc[0]+1;
    } else if(nxsts=="Shipped") {
      noc[1] = noc[1]+1;
    } else if(nxsts=="Tracking") {
      noc[2] = noc[2]+1;
    } else if(nxsts=="Delivered") {
      noc[3] = noc[3]+1;
    }

    this.painserv.postData({ 'oid': id, "statusval": nxsts }, "followupnumberofcallset").then((result) => {
      this.dialogRef.close();
    }, (err) => {
      //Connection failed message
    });
  }


}
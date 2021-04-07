import { Component, OnDestroy } from '@angular/core';
import { PainServiceService } from './services/pain-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent implements OnDestroy{
  myDate = new Date();
  currDate: String;
  todayOrderi: any;
  tenqury : any;
  tissue : any;
  grantdata:any;
 
  noprec = false;
  popvisiable = false;
  status = false;
  sidenavWidth = 4;

  constructor(public painser: PainServiceService, private datePipe: DatePipe) {
    this.currDate = this.datePipe.transform(this.myDate, 'dd-MMMM, yyyy');

    if (this.painser.login_check()) {
      this.status = true;
    } else {
    }
  }


  ngOnInit() {
    this.painser.postData({ }, "getbadgetnumbers").then((result: any) => {
      this.tenqury = result.tenquiry;
      this.tissue = result.tissues;
      this.grantdata = result.grantdata;
      if(this.grantdata.length>0) {
        this.noprec = false;
      } else {
        this.noprec = true;
      }
    }, (err) => {
      //Connection failed message
    });
  }
  increase() {
    this.sidenavWidth = 15;
  }


  decrease() {
    this.sidenavWidth = 4;
  }

  showpopup() {
    if(this.popvisiable) {
      this.popvisiable = false;
    } else {
      this.popvisiable = true;
    }
  }

  grantpermission(id) {
    if(confirm("Are you sure want to give permission the secondary admin?")) {
      this.painser.postData({"id":id}, "givegrantpermission").then((result: any) => {
        this.grantdata = result.grantdata;
        if(this.grantdata.length>0) {
          this.noprec = false;
        } else {
          this.noprec = true;
        }
      }, (err) => {
        //Connection failed message
      });
    }
  }

  deletephonegrant(id) {
    if(confirm("Are you sure want to delete this records?")) {
      this.painser.postData({"id":id}, "deletegrantrequest").then((result: any) => {
        this.grantdata = result.grantdata;
        if(this.grantdata.length>0) {
          this.noprec = false;
        } else {
          this.noprec = true;
        }
      }, (err) => {
        //Connection failed message
      });
    }
  }

  Logout() {
    this.painser.clearCookieData();
    localStorage.removeItem("login");
    window.location.reload();
  }


  ngOnDestroy() {
    this.painser.clearCookieData();
  }


}




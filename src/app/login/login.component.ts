import { Component, OnInit } from '@angular/core';
import { PainServiceService } from 'src/app/services/pain-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resposeData : any;
  userData = {"username":"", "password":""};

  constructor(public painser: PainServiceService, private _router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if(this.painser.login_check()) {
      this._router.navigate(['']);
    }
  }

  login(){
    if(this.userData.username && this.userData.password){
     this.painser.postData(this.userData, "login").then((result) =>{
     this.resposeData = result;
     if(this.resposeData.error) {
        this.snackBar.open("Enter Correct username and Password", "Failed", {
          duration: 2000,
        });
     } else {
      //this._router.navigate(['']);
      localStorage.setItem("login","Yes");
      window.location.reload();
     }

     }, (err) => {
       //Connection failed message
     });
    }
    else{
      this.snackBar.open("Enter Correct username and Password", "Failed", {
        duration: 2000,
      });
    }
   }


}

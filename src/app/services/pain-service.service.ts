import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { stringify } from '@angular/core/src/util';

//let apiUrl = 'https://selcoenterprises.com/0webapi/api/';
let apiUrl = 'https://oneglobalpharma.com/0webapibk/0webapi/api/';

@Injectable({
  providedIn: 'root'
})

export class PainServiceService {

  constructor(public http: HttpClient, public _cookieService: CookieService) { }

  postData(credentials, type) {

    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      this.http.post(apiUrl + type, JSON.stringify(credentials), { headers: headers }).
        subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

 
  get getCookieData() {
    return this._cookieService.get('loginstatus');
  }

  setCookieData(key: string, value: string) {
    const expire = new Date();
    expire.setMinutes(expire.getMinutes() + 360);
    this._cookieService.set(key, value, expire);
  }

  clearCookieData() {
    this._cookieService.deleteAll();
  }

  login_check() {
    var sts = this.getCookieData;
    console.log(sts, 'sts')
    if (sts == undefined) {
      return false;
    } else if (sts == "Yes") {
      return true;
    } else {
      return false;
    }
  }

  makecall(phn, country) {
    var res = this.getnumwithcountry(phn, country);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set( 'Content-Type', "application/json" );
      this.http.get("https://clicktocall.xclusivedesk.com/easyobcall.php?AgentNum=GPM1001&CustNum="+res+"&admin_id=2&UserID=59&AgentID=&Circle=haryana&Operator=airtel&campaign=xdclicktocallInt&caller_did=1204955286", { headers: headers, responseType: 'text' }).
        subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  getnumwithcountry(phone, country) {
    if (country == "USA" || country == "United States") {
      if (phone.charAt(0) == "1") {
        //return "+" + phone;
        return phone;
      } else if (phone.charAt(0) == "+") {
        return phone;
      } else {
        return "1" + phone;
      }
    } else if (country == "United Kingdom" || country == "UK") {
      if (phone.charAt(0) == "4") {
       // return "+" + phone;
       return phone;
      } else if (phone.charAt(0) == "+") {
        return phone;
      } else {
        return "44" + phone;
      }
    } else if (country == "Australia") {
      if (phone.charAt(0) == "6") {
        //return "+" + phone;
        return phone;
      } else if (phone.charAt(0) == "+") {
        return phone;
      } else {
        return "61" + phone;
      }
    } else if(country == "India") {
      if (phone.charAt(0) == "9") {
        //return "+" + phone;
        return phone;
      } else if (phone.charAt(0) == "+") {
        return phone;
      } else {
        return "91" + phone;
      }
    } else {
      return phone;
    } 
  }


  getcallsts(oid) {
    /*return new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set( 'Content-Type', "application/json" );
      this.http.get("http://control.xclusivedesk.com/apis/getcalldetail?oid="+oid, { headers: headers, responseType: 'text' }).
        subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err); 
        });
    });*/
  }

}

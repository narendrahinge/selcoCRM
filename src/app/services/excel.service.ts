import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(oldjson: any[], excelFileName: string): void {

    // console.log(json);
    var json = this.acendingSortJson(oldjson);

    for (let i = 0; i < json.length; i++) {
      json[i]['prodname'] = this.getProductName(json[i]['prname']);
      json[i]['qtysall'] = this.getAllQyantity(json[i]['prname']);
      json[i]['priceprod'] = this.getAllPrices(json[i]['prname'], json[i]['web']);
      json[i]['trackidall'] = this.getAllTrackID(json[i]['trck']);
    }

    console.log(json);
    var res = this.sortByKey(json, ['status', 'date', 'invid', 'phone', 'email', 'name', 'address', 'city', 'state', 'zip', 'country', 'prodname', 'qtysall', 'priceprod', 'shsts', 'trackidall', 'noc', 'cno', 'cex', 'cvv', 'web']);



    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res);
    worksheet.A1.v = "PAYMENT STATUS";
    worksheet.B1.v = "ORDER DATE";
    worksheet.C1.v = "INVOICE ID";
    worksheet.D1.v = "PHONE";
    worksheet.E1.v = "EMAIL";
    worksheet.F1.v = "NAME";
    worksheet.G1.v = "ADDRESS";
    worksheet.H1.v = "CITY";
    worksheet.I1.v = "STATE";
    worksheet.J1.v = "ZIP";
    worksheet.K1.v = "COUNTRY";
    worksheet.L1.v = "PRODUCT NAME";
    worksheet.M1.v = "QUANTITY";
    worksheet.N1.v = "AMOUNT";
    worksheet.O1.v = "SHIPMENT STATUS";
    worksheet.P1.v = "TRACKING ID";
    worksheet.Q1.v = "NAME ON CARD";
    worksheet.R1.v = "CARD NO";
    worksheet.S1.v = "EXP. MM/YY";
    worksheet.T1.v = "CVV";
    worksheet.U1.v = "WEBSITE";
    //console.log('worksheet',worksheet);

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);


  }

  private getProductName(arr) {
    var str = "";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]['pname']) {

        str += i == 0 ? arr[i]['pname'] : ", " + arr[i]['pname'];
      }
    }
    return str;
  }

  private getAllQyantity(arr) {
    var str = "";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]['qty']) {
        str += i == 0 ? arr[i]['qty'] : ", " + arr[i]['qty'];
      }
    }
    return str;
  }

  private getAllPrices(arr, web) {
    var tot = 0;
    /* Check it Order is Manual Order Becouse manual order direct insrted Total Of Order*/ 
    if (web == "Manualorder") {
      var price = arr[0]['price'];
      /* If Order Total COntain $ sign */
      if(price.includes("$")) {
        price= price.slice(1);
      }
      tot = parseInt(price);
      return "$" + tot;
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]['price']) {
          tot += arr[i]['qty'] * arr[i]['price'];
        }
      }
      return "$" + (tot + 20);
    }
  }

  private getAllTrackID(arr) {
    var str = "";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        str += i == 0 ? arr[i] : ", " + arr[i];
      }
    }
    return str;
  }

  private sortByKey(array, keys) {
    return array.map(function (a, b) {
      return Object.assign([], ...keys.map((k) => ({ [k]: a[k] })));
    });
  }




  public acendingSortJson(array) {
    var keyarr = [];
    var mainarr = [];
    var resarr;

    array.map(function (a, b) {
      if (!keyarr.includes(a.web)) {
        keyarr.push(a.web);
      }
    });
    for (let i = 0; i < keyarr.length; i++) {
      var webarr = array.filter(function (val) {
        return val.web == keyarr[i];
      });

      var sortarr = this.sortArrayAsceding(webarr);
      resarr = this.mergeArray(mainarr, sortarr);
    }
    return resarr;
  }

  sortArrayAsceding(array) {
    return array.sort(function (a, b) {
      return a.oid - b.oid;
    });
  }

  mergeArray(sarray, darr) {
    for (let i = 0; i < darr.length; i++) {
      sarray.push(darr[i]);
    }
    return sarray;
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + 'Report' + EXCEL_EXTENSION);
  }

}

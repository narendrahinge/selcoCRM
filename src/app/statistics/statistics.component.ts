import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PainServiceService } from '../services/pain-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  resposeData: any;
  selected = 'd10';
  pieData;
  PieChart = [];
  allLineChart = [];
  allLineChart20 = [];
  barChart;
  loadStsBarChart = false;
  loadSts = false;
  selectedLinechart = "painkillermedicines.com";

  price = [];
  linecharts;
  manualocchart = [];
  listDataLineChart: MatTableDataSource<any>;

  constructor(public painserv: PainServiceService, public _router: Router) {


  }

  ngOnInit() {
    /* Check if user is loged in*/ 
    if (this.painserv.login_check()) {

      
      /* Bar chart*/
      this.painserv.postData({ 'method': this.selected }, "allorders").then((result) => {
        this.resposeData = result;
        this.loadStsBarChart = true;
        this.pieData = this.addCountInArr(this.resposeData.userData);
        this.barChartSet();
      }, (err) => {
        //Connection failed message
      });


      /* LIne Chart*/
      this.loadSts = true;
      this.painserv.postData({ 'method': "all" }, "allorders").then((result) => {
        this.resposeData = result;
        this.listDataLineChart = new MatTableDataSource(this.resposeData.userData);

        this.allLineChart = this.alllinechart(this.listDataLineChart);
        this.allLineChart20 = this.alllinechart20(this.listDataLineChart);
        this.combinelineChart();
        this.combinelineChart20();

        this.listDataLineChart.filter = "painkillermedicines.com";
        var res = this.getMonthsarray20(this.listDataLineChart.filteredData);
        this.price = res;
        this.lineChart();
        this.loadSts = false;
      }, (err) => {
        //Connection failed message
      });


      /* All Manual Orders */
      this.painserv.postData({}, "allmanualorder").then((result) => {
        this.resposeData = result;
        var respo = this.getMonthsarray20(this.resposeData.userData);
        this.manualocchart = respo;
        this.manualordercart();
      }, (err) => {
        //Connection failed message
      });


    } else {
      this._router.navigateByUrl('login');
    }
  }

  barChartSet() {
    if (this.loadStsBarChart) {
      this.barChart = new Chart('bar', {
        type: 'bar',
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'All Website Orders'
          },
          scales: {
            yAxes: [{
              ticks: {
                suggestedMin: 0
              }
            }]
          }
        },
        data: {
          labels: ['Data'],
          datasets: [
            {
              type: 'bar',
              label: 'painkillermedicines.com',
              data: [this.pieData[0]],
              backgroundColor: '#09e0b09c',
              fill: false,
            }, {
              type: 'bar',
              label: 'globalpharmameds.com',
              data: [this.pieData[1]],
              backgroundColor: '#3b59989e',
              fill: false,
            },
            {
              type: 'bar',
              label: 'drugstoreplanet.com',
              data: [this.pieData[2]],
              backgroundColor: '#03a9f480',
              fill: false,
            },
            {
              type: 'bar',
              label: 'ordercypionate.com',
              data: [this.pieData[3]],
              backgroundColor: '#f83920a1',
              fill: false,
            },
            {
              type: 'bar',
              label: 'tramadolexport.com',
              data: [this.pieData[4]],
              backgroundColor: '#298c03b0',
              fill: false,
            },
            {
              type: 'bar',
              label: 'tramadolsale.com',
              data: [this.pieData[5]],
              backgroundColor: '#f1b106b5',
              fill: false,
            },
            {
              type: 'bar',
              label: 'buyanxietymedicines.com',
              data: [this.pieData[6]],
              backgroundColor: '#689f38',
              fill: false,
            },
            {
              type: 'bar',
              label: 'bytramadolonlinecod.com',
              data: [this.pieData[7]],
              backgroundColor: '#224c83',
              fill: false,
            },
            {
              type: 'bar',
              label: 'thtramadol-howto.com',
              data: [this.pieData[8]],
              backgroundColor: '#f08332',
              fill: false,
            },
            {
              type: 'bar',
              label: 'Manualorder',
              data: [this.pieData[9]],
              backgroundColor: '#1f1f1fad',
              fill: false,
            }
          ]
        }
      });
    }
  }


  lineChart() {
    this.linecharts = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
          {
            data: this.price,
            borderColor: '#ff8181',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        title: {
          display: true,
          text: 'Single Website Monthly Order'
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }


  combinelineChart() {
    this.linecharts = new Chart('combinelineChart', {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: this.allLineChart
      },
      options: {
        legend: {
          display: true
        },
        responsive: true,
        title: {
          display: true,
          text: 'All Website Monthly Graph'
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  
  combinelineChart20() {
    this.linecharts = new Chart('combinelineChart20', {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: this.allLineChart20
      },
      options: {
        legend: {
          display: true
        },
        responsive: true,
        title: {
          display: true,
          text: 'All Website Monthly Graph'
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  manualordercart() {
    this.linecharts = new Chart('manualocchart', {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
          {
            data: this.manualocchart,
            borderColor: '#1f1f1fad',
            backgroundColor: '#1f1f1fad',
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        title: {
          display: true,
          text: 'Manual Order\'s '
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }


  barchartFilter(val) {
    this.listDataLineChart.filter = val;
    var res = this.getMonthsarray20(this.listDataLineChart.filteredData);
    this.linecharts.data.datasets[0].data = res;
    this.linecharts.update();
  }

  datafetch(val) {
    this.loadSts = true;
    this.painserv.postData({ 'method': val }, "allorders").then((result) => {
      this.resposeData = result;
      this.pieData = this.addCountInArr(this.resposeData.userData);
      this.updateBarchart(this.pieData);
      this.loadSts = false;
    }, (err) => {
      //Connection failed message
    });
  }

  addCountInArr(array) { 
    var respk = this.getKeyLength(array, "web", "painkillermedicines.com");
    var resgp = this.getKeyLength(array, "web", "globalpharmamedicines.com");
    var resdp = this.getKeyLength(array, "web", "drugstoreplanet.com");
    var resoc = this.getKeyLength(array, "web", "ordercypionate.com");
    var reste = this.getKeyLength(array, "web", "tramadolexport.com");
    var restsa = this.getKeyLength(array, "web", "tramadolsale.com");
    var restsanxi = this.getKeyLength(array, "web", "buyanxietymedicines.com");
    var restsbytram = this.getKeyLength(array, "web", "bytramadolonlinecod.com");
    var restsbytrht = this.getKeyLength(array, "web", "thtramadol-howto.com");
    var manu = this.getKeyLength(array, "web", "Manualorder");
    return [respk, resgp, resdp, resoc, reste, restsa,restsanxi, restsbytram, restsbytrht, manu];
  }


  updateBarchart(arr) {
    this.barChart.data.datasets[0].data = [arr[0]];
    this.barChart.data.datasets[1].data = [arr[1]];
    this.barChart.data.datasets[2].data = [arr[2]];
    this.barChart.data.datasets[3].data = [arr[3]];
    this.barChart.data.datasets[4].data = [arr[4]];
    this.barChart.data.datasets[5].data = [arr[5]];
    this.barChart.data.datasets[6].data = [arr[6]];
    this.barChart.data.datasets[7].data = [arr[7]];
    this.barChart.data.datasets[8].data = [arr[8]];
    this.barChart.update();
  }

  getMonthsarray(array) {
    var montharr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var newarr = [];
    for (let j = 0; j < montharr.length; j++) {
      var noi = 0;
      for (let i = 0; i < array.length; i++) {
        var date = array[i].date;
        var substr = montharr[j] + "/2019";
        //console.log(date, substr);
        if (date.includes(substr)) {
          noi++;
        }
      }
      newarr.push(noi);
    }
    return newarr;
  }

  getMonthsarray20(array) {
    var montharr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var newarr = [];
    for (let j = 0; j < montharr.length; j++) {
      var noi = 0;
      for (let i = 0; i < array.length; i++) {
        var date = array[i].date;
        var substr = montharr[j] + "/2020";
        //console.log(date, substr);
        if (date.includes(substr)) {
          noi++;
        }
      }
      newarr.push(noi);
    }
    return newarr;
  }

  getKeyLength(array, keyField, keyValue) {
    var sum = 0;
    for (var i = 0, len = array.length; i < len; i++)
      if (array[i][keyField] == keyValue)
        sum++;
    return sum;
  }


  alllinechart(data) {
    var avgall = [];
    var webarr = ['painkillermedicines.com', 'globalpharmamedicines.com', 'drugstoreplanet.com', 'ordercypionate.com', 'tramadolexport.com', 'tramadolsale.com', 'buyanxietymedicines.com', 'bytramadolonlinecod.com', 'Manualorder'];
    var colorarr = ['#09e0b09c', '#3b59989e', '#03a9f480', '#f83920a1', '#298c03b0', '#f1b106b5', '#689f38', '#224c83', '#1f1f1fad'];
    for (let i = 0; i < webarr.length; i++) {
      data.filter = webarr[i];
      var res = this.getMonthsarray(data.filteredData);
      var abc = {
        label: webarr[i],
        data: res,
        borderColor: colorarr[i],
        backgroundColor: colorarr[i],
        fill: false
      }
      avgall.push(abc);
    }
    return avgall;
  }

  alllinechart20(data) {
    var avgall = [];
    var webarr = ['painkillermedicines.com', 'globalpharmamedicines.com', 'drugstoreplanet.com', 'ordercypionate.com', 'tramadolexport.com', 'tramadolsale.com', 'buyanxietymedicines.com', 'bytramadolonlinecod.com', 'thtramadol-howto.com', 'Manualorder'];
    var colorarr = ['#09e0b09c', '#3b59989e', '#03a9f480', '#f83920a1', '#298c03b0', '#f1b106b5', '#689f38', '#224c83', '#f08332', '#1f1f1fad'];
    for (let i = 0; i < webarr.length; i++) {
      data.filter = webarr[i];
      var res = this.getMonthsarray20(data.filteredData);
      var abc = {
        label: webarr[i],
        data: res,
        borderColor: colorarr[i],
        backgroundColor: colorarr[i],
        fill: false
      }
      avgall.push(abc);
    }
    return avgall;
  }

}

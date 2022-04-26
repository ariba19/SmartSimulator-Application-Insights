import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatInput } from '@angular/material/input';

interface table1model {
  method: string;
  module: string;
  api: string;
  response: number;
  time: number;
  region: string;
  nowtime: string;
}
@Component({
  selector: 'app-todaydashboard',
  templateUrl: './todaydashboard.component.html',
  styleUrls: ['./todaydashboard.component.css']
})
export class TodaydashboardComponent implements OnInit {
  @Input() data;
  chart6: any = [];
  linemap: any;
  table1: any = [];
  num = 0;
  single = '';
  previous = '';

  datee: any;
  todaysdate: any;
  todaysdate1 = '';
  monthmap: any;
  arr: any = [];
  chart1: any = [];
  chart2: any = [];
  chart3: any = [];
  nestedmap: any;
  operationmap: any;
  bookingmap: any;
  inputdate = '';
  subscriptionsmap: any;
  contentmap: any;
  trainermap: any;
  chart4: any = [];
  r = '';
  chart5: any = [];
  chart7: any = [];
  apimap: any;
  singlerange = new FormGroup({
    start1: new FormControl(Validators.required),
  });
  displayedColumns = ['method', 'module', 'api', 'response', 'time', 'region', 'nowtime'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;


  constructor(private _weather: WeatherService) {
    this.monthmap = new Map();
    this.monthmap.set('Jan', '01');
    this.monthmap.set('Feb', '02');
    this.monthmap.set('Mar', '03');
    this.monthmap.set('Apr', '04');
    this.monthmap.set('May', '05');
    this.monthmap.set('Jun', '06');
    this.monthmap.set('Jul', '07');
    this.monthmap.set('Aug', '08');
    this.monthmap.set('Sep', '09');
    this.monthmap.set('Oct', '10');
    this.monthmap.set('Nov', '11');
    this.monthmap.set('Dec', '12');
    this.todaysdate = new Date();
    this.todaysdate = this.todaysdate.toString().substring(4, 15);
    this.r = this.todaysdate;
    // let st=this.data;
    //st=st+'';
    // this.inputdate=st.substring(4,15);
    this.arr = this.todaysdate.split(' ');
    this.todaysdate = this.arr[2] + "-" + this.monthmap.get(this.arr[0]) + "-" + this.arr[1];

  }


  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe((res) => {

        console.log(this.data + " mmmmmm");
        this.inputdate = this.data + '';
        // this.inputdate=this.inputdate;
        console.log(this.r + " oo " + this.inputdate);
        this.nestedmap = new Map();
        this.operationmap = new Map();
        this.operationmap.set('00', 0);
        this.operationmap.set('01', 0);
        this.operationmap.set('02', 0);
        this.operationmap.set('03', 0);
        this.operationmap.set('04', 0);
        this.operationmap.set('05', 0);
        this.operationmap.set('06', 0);
        this.operationmap.set('07', 0);
        this.operationmap.set('08', 0);
        this.operationmap.set('09', 0);
        this.operationmap.set('10', 0);
        this.operationmap.set('11', 0);
        this.operationmap.set('12', 0);
        this.operationmap.set('13', 0);
        this.operationmap.set('14', 0);
        this.operationmap.set('15', 0);
        this.operationmap.set('16', 0);
        this.operationmap.set('17', 0);
        this.operationmap.set('18', 0);
        this.operationmap.set('19', 0);
        this.operationmap.set('20', 0);
        this.operationmap.set('21', 0);
        this.operationmap.set('22', 0);
        this.operationmap.set('23', 0);
        this.linemap = new Map();
        this.linemap.set('00', 0);
        this.linemap.set('01', 0);
        this.linemap.set('02', 0);
        this.linemap.set('03', 0);
        this.linemap.set('04', 0);
        this.linemap.set('05', 0);
        this.linemap.set('06', 0);
        this.linemap.set('07', 0);
        this.linemap.set('08', 0);
        this.linemap.set('09', 0);
        this.linemap.set('10', 0);
        this.linemap.set('11', 0);
        this.linemap.set('12', 0);
        this.linemap.set('13', 0);
        this.linemap.set('14', 0);
        this.linemap.set('15', 0);
        this.linemap.set('16', 0);
        this.linemap.set('17', 0);
        this.linemap.set('18', 0);
        this.linemap.set('19', 0);
        this.linemap.set('20', 0);
        this.linemap.set('21', 0);
        this.linemap.set('22', 0);
        this.linemap.set('23', 0);
        //this.linemap.set('24',0);
        this.bookingmap = new Map();
        this.bookingmap.set('00', 0);
        this.bookingmap.set('01', 0);
        this.bookingmap.set('02', 0);
        this.bookingmap.set('03', 0);
        this.bookingmap.set('04', 0);
        this.bookingmap.set('05', 0);
        this.bookingmap.set('06', 0);
        this.bookingmap.set('07', 0);
        this.bookingmap.set('08', 0);
        this.bookingmap.set('09', 0);
        this.bookingmap.set('10', 0);
        this.bookingmap.set('11', 0);
        this.bookingmap.set('12', 0);
        this.bookingmap.set('13', 0);
        this.bookingmap.set('14', 0);
        this.bookingmap.set('15', 0);
        this.bookingmap.set('16', 0);
        this.bookingmap.set('17', 0);
        this.bookingmap.set('18', 0);
        this.bookingmap.set('19', 0);
        this.bookingmap.set('20', 0);
        this.bookingmap.set('21', 0);
        this.bookingmap.set('22', 0);
        this.bookingmap.set('23', 0);
        this.subscriptionsmap = new Map();
        this.subscriptionsmap.set('00', 0);
        this.subscriptionsmap.set('01', 0);
        this.subscriptionsmap.set('02', 0);
        this.subscriptionsmap.set('03', 0);
        this.subscriptionsmap.set('04', 0);
        this.subscriptionsmap.set('05', 0);
        this.subscriptionsmap.set('06', 0);
        this.subscriptionsmap.set('07', 0);
        this.subscriptionsmap.set('08', 0);
        this.subscriptionsmap.set('09', 0);
        this.subscriptionsmap.set('10', 0);
        this.subscriptionsmap.set('11', 0);
        this.subscriptionsmap.set('12', 0);
        this.subscriptionsmap.set('13', 0);
        this.subscriptionsmap.set('14', 0);
        this.subscriptionsmap.set('15', 0);
        this.subscriptionsmap.set('16', 0);
        this.subscriptionsmap.set('17', 0);
        this.subscriptionsmap.set('18', 0);
        this.subscriptionsmap.set('19', 0);
        this.subscriptionsmap.set('20', 0);
        this.subscriptionsmap.set('21', 0);
        this.subscriptionsmap.set('22', 0);
        this.subscriptionsmap.set('23', 0);
        this.contentmap = new Map();
        this.contentmap.set('00', 0);
        this.contentmap.set('01', 0);
        this.contentmap.set('02', 0);
        this.contentmap.set('03', 0);
        this.contentmap.set('04', 0);
        this.contentmap.set('05', 0);
        this.contentmap.set('06', 0);
        this.contentmap.set('07', 0);
        this.contentmap.set('08', 0);
        this.contentmap.set('09', 0);
        this.contentmap.set('10', 0);
        this.contentmap.set('11', 0);
        this.contentmap.set('12', 0);
        this.contentmap.set('13', 0);
        this.contentmap.set('14', 0);
        this.contentmap.set('15', 0);
        this.contentmap.set('16', 0);
        this.contentmap.set('17', 0);
        this.contentmap.set('18', 0);
        this.contentmap.set('19', 0);
        this.contentmap.set('20', 0);
        this.contentmap.set('21', 0);
        this.contentmap.set('22', 0);
        this.contentmap.set('23', 0);
        this.trainermap = new Map();
        this.trainermap.set('00', 0);
        this.trainermap.set('01', 0);
        this.trainermap.set('02', 0);
        this.trainermap.set('03', 0);
        this.trainermap.set('04', 0);
        this.trainermap.set('05', 0);
        this.trainermap.set('06', 0);
        this.trainermap.set('07', 0);
        this.trainermap.set('08', 0);
        this.trainermap.set('09', 0);
        this.trainermap.set('10', 0);
        this.trainermap.set('11', 0);
        this.trainermap.set('12', 0);
        this.trainermap.set('13', 0);
        this.trainermap.set('14', 0);
        this.trainermap.set('15', 0);
        this.trainermap.set('16', 0);
        this.trainermap.set('17', 0);
        this.trainermap.set('18', 0);
        this.trainermap.set('19', 0);
        this.trainermap.set('20', 0);
        this.trainermap.set('21', 0);
        this.trainermap.set('22', 0);
        this.trainermap.set('23', 0);
        this.datee = new Date();
        this.datee = this.datee.toString().substring(16, 18);
        if (this.r === this.inputdate) {
          res['products'].forEach((x) => {
            if (x.date === this.todaysdate) {
              this.linemap.set(x.nowtime.substring(0, 2), this.linemap.get(x.nowtime.substring(0, 2)) + 1);
              if (x.api.split('/')[1] === 'booking') {
                this.bookingmap.set(x.nowtime.substring(0, 2), this.bookingmap.get(x.nowtime.substring(0, 2)) + 1);

              }
              if (x.api.split('/')[1] === 'subscriptions') {
                this.subscriptionsmap.set(x.nowtime.substring(0, 2), this.subscriptionsmap.get(x.nowtime.substring(0, 2)) + 1);

              }
              if (x.api.split('/')[1] === 'contentcreator') {
                this.contentmap.set(x.nowtime.substring(0, 2), this.contentmap.get(x.nowtime.substring(0, 2)) + 1);

              }
              if (x.api.split('/')[1] === 'trainer') {
                this.trainermap.set(x.nowtime.substring(0, 2), this.trainermap.get(x.nowtime.substring(0, 2)) + 1);

              }
              if (x.api.split('/')[1] === 'operations') {
                this.operationmap.set(x.nowtime.substring(0, 2), this.operationmap.get(x.nowtime.substring(0, 2)) + 1);

              }
            }
          })
          this.apimap = new Map();
          res['products'].forEach((x) => {
            if (x.date === this.todaysdate && Math.abs((x.nowtime.substring(0, 2)) - this.datee) <= 1 && x.api.indexOf('mioperations') === -1 && x.api.indexOf('fetchuserroles') === -1 && x.api.indexOf('regiondetails') === -1) {
              if (this.apimap.has(x.api.substring(0, 1) + x.api.substring(x.api.split('/')[1].length + 2))) {
                this.apimap.set(x.api.substring(0, 1) + x.api.substring(x.api.split('/')[1].length + 2), this.apimap.get(x.api.substring(0, 1) + x.api.substring(x.api.split('/')[1].length + 2)) + 1);
              }
              else {
                this.apimap.set(x.api.substring(0, 1) + x.api.substring(x.api.split('/')[1].length + 2), 1);
              }
            }
          })

          let bool = false;
          let keys1: any = [];
          let values1: any = [];
          this.linemap.forEach((value: number, key: string) => {
            if (key > '12') {
              let key1 = (+key) - 12;

              keys1.push(key1.toString() + 'pm');
            }
            else if (key === '12') {

              keys1.push('12pm');

            }
            else {
              if (key < '10') {
                keys1.push(key.substring(1, 2) + 'am');
              }
              else {
                keys1.push(key + 'am');
              }
            }
            values1.push(value);
          })
          console.log(keys1);
          this.chart6 = new Chart('canvas6', {
            type: 'line',
            data: {
              labels: keys1,
              datasets: [
                {
                  label: 'Number of Api calls',
                  data: values1,
                  borderColor: '#DA680E',
                  //  backgroundColor:'orange'

                  fill: true
                },
              ]
            },

          })



          res['products'].forEach((x) => {

            if (x.date === this.todaysdate && Math.abs((x.nowtime.substring(0, 2)) - this.datee) <= 1) {
              var table1modelData: table1model = {
                api: x.api.substring(0, 1) + x.api.substring(x.api.split('/')[1].length + 2),
                module: x.api.split("/")[1],
                method: x.method,
                response: x.response,
                time: x.time,
                region: x.region,
                nowtime: x.nowtime,
              };

              this.table1.push(table1modelData);
              // console.log('pushingggg');
            }
          })


          this.dataSource = new MatTableDataSource(this.table1);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;
          //let timeoutarray=[];


          let keys111 = Array.from(this.bookingmap.keys());
          let keysone = [];
          keys111.forEach((x) => {
            if (x > '12') {
              let key1 = (+x) - 12;
              keysone.push(key1.toString() + 'pm');
            }
            else if (x === '12') {

              keysone.push('12pm');
            }
            else {
              if (x < '10') {
                keysone.push(x.toString().substring(1, 2) + 'am');
              }
              else {
                keysone.push(x + 'am');
              }
            }
          })
          let values111 = Array.from(this.bookingmap.values());
          this.chart1 = new Chart('canvas1', {
            type: 'line',
            data: {
              labels: keysone,
              datasets: [
                {
                  label: 'Number of Api calls in Booking portal',
                  data: values111,
                  borderColor: '#E1AD01',
                  //   backgroundColor:'#E1AD01'

                  fill: true
                },
              ]
            },

          })






          let keys22 = Array.from(this.subscriptionsmap.keys());
          let keystwo = [];
          keys22.forEach((x) => {
            if (x > '12') {
              let key1 = (+x) - 12;
              keystwo.push(key1.toString() + 'pm');
            }
            else if (x === '12') {

              keystwo.push('12pm');
            }
            else {
              if (x < '10') {
                keystwo.push(x.toString().substring(1, 2) + 'am');
              }
              else {
                keystwo.push(x + 'am');
              }
            }
          })
          let values22 = Array.from(this.subscriptionsmap.values());
          this.chart2 = new Chart('canvas2', {
            type: 'line',
            data: {
              labels: keystwo,
              datasets: [
                {
                  label: 'Number of Api calls in Subscriptions portal',
                  data: values22,
                  borderColor: '#6BA32D',
                  //  backgroundColor:'#6BA32D'

                  fill: true
                },
              ]
            },

          })



          let keys33 = Array.from(this.contentmap.keys());
          let keysthree = [];
          keys33.forEach((x) => {
            if (x > '12') {
              let key1 = (+x) - 12;
              keysthree.push(key1.toString() + 'pm');
            }
            else if (x === '12') {

              keysthree.push('12pm');
            }
            else {
              if (x < '10') {
                keysthree.push(x.toString().substring(1, 2) + 'am');
              }
              else {
                keysthree.push(x + 'am');
              }
            }
          })
          let values33 = Array.from(this.contentmap.values());
          this.chart3 = new Chart('canvas3', {
            type: 'line',
            data: {
              labels: keysthree,
              datasets: [
                {
                  label: 'Number of Api calls in Content portal',
                  data: values33,
                  borderColor: '#9867C5',
                  //  backgroundColor:'#9867C5'

                  fill: true
                },
              ]
            },

          })




          let keys44 = Array.from(this.trainermap.keys());
          let keysfour = [];
          keys44.forEach((x) => {
            if (x > '12') {
              let key1 = (+x) - 12;
              keysfour.push(key1.toString() + 'pm');
            }
            else if (x === '12') {

              keysfour.push('12pm');
            }
            else {
              if (x < '10') {
                keysfour.push(x.toString().substring(1, 2) + 'am');
              }
              else {
                keysfour.push(x + 'am');
              }
            }
          })
          let values44 = Array.from(this.trainermap.values());
          this.chart4 = new Chart('canvas4', {
            type: 'line',
            data: {
              labels: keysfour,
              datasets: [
                {
                  label: 'Number of Api calls in Trainer portal',
                  data: values44,
                  borderColor: '#3A9BDC',
                  //  backgroundColor:'#3A9BDC'

                  fill: true
                },
              ]
            },

          })





          let keys55 = Array.from(this.operationmap.keys());
          let keysfive = [];
          keys55.forEach((x) => {
            if (x > '12') {
              let key1 = (+x) - 12;
              keysfive.push(key1.toString() + 'pm');
            }
            else if (x === '12') {

              keysfive.push('12pm');
            }
            else {
              if (x < '10') {
                keysfive.push(x.toString().substring(1, 2) + 'am');
              }
              else {
                keysfive.push(x + 'am');
              }
            }
          })
          let values55 = Array.from(this.operationmap.values());
          this.chart5 = new Chart('canvas5', {
            type: 'line',
            data: {
              labels: keysfive,
              datasets: [
                {
                  label: 'Number of Api calls in Operations portal',
                  data: values55,
                  borderColor: '#EB3C62',
                  // backgroundColor:'#EB3C62'

                  fill: true
                },
              ]
            },

          })



          let keys66 = Array.from(this.apimap.keys());
          let values66 = Array.from(this.apimap.values());
          this.chart7 = new Chart('canvas7', {
            type: 'pie',
            data: {
              labels: keys66,
              datasets: [
                {
                  label: 'api usage',
                  data: values66,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#F25278',
                    'purple',
                    '#61B33B',
                    '#e1ad01',
                    'orange',
                    'red',
                    'grey',
                    'black',
                    'green',
                    'blue',
                    'yellow',
                    'pink'


                  ],
                  borderColor: [
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                  ],
                  borderWidth: 2
                },
              ]
            },


          })


        }





        else {
          this.arr = this.inputdate.split(' ');
          this.inputdate = this.arr[2] + "-" + this.monthmap.get(this.arr[0]) + "-" + this.arr[1];
          res['products'].forEach((x) => {
            if (x.date === this.inputdate) {////convert input date to map format
              this.linemap.set(x.nowtime.substring(0, 2), this.linemap.get(x.nowtime.substring(0, 2)) + 1);
              if (x.api.split('/')[1] === 'booking') {
                this.bookingmap.set(x.nowtime.substring(0, 2), this.bookingmap.get(x.nowtime.substring(0, 2)) + 1);

              }
              if (x.api.split('/')[1] === 'subscriptions') {
                this.subscriptionsmap.set(x.nowtime.substring(0, 2), this.subscriptionsmap.get(x.nowtime.substring(0, 2)) + 1);

              }
              if (x.api.split('/')[1] === 'contentcreator') {
                this.contentmap.set(x.nowtime.substring(0, 2), this.contentmap.get(x.nowtime.substring(0, 2)) + 1);

              }
              if (x.api.split('/')[1] === 'trainer') {
                this.trainermap.set(x.nowtime.substring(0, 2), this.trainermap.get(x.nowtime.substring(0, 2)) + 1);

              }
              if (x.api.split('/')[1] === 'operations') {
                this.operationmap.set(x.nowtime.substring(0, 2), this.operationmap.get(x.nowtime.substring(0, 2)) + 1);

              }
            }
          })
          this.apimap = new Map();
          res['products'].forEach((x) => {
            if (x.date === this.inputdate && x.api.indexOf('mioperations') === -1 && x.api.indexOf('fetchuserroles') === -1 && x.api.indexOf('regiondetails') === -1) {
              if (this.apimap.has(x.api.substring(0, 1) + x.api.substring(x.api.split('/')[1].length + 2))) {
                this.apimap.set(x.api.substring(0, 1) + x.api.substring(x.api.split('/')[1].length + 2), this.apimap.get(x.api.substring(0, 1) + x.api.substring(x.api.split('/')[1].length + 2)) + 1);
              }
              else {
                this.apimap.set(x.api.substring(0, 1) + x.api.substring(x.api.split('/')[1].length + 2), 1);
              }
            }
          })

          let bool = false;
          let keys1: any = [];
          let values1: any = [];
          this.linemap.forEach((value: number, key: string) => {
            if (key > '12') {
              let key1 = (+key) - 12;

              keys1.push(key1.toString() + 'pm');
            }
            else if (key === '12') {

              keys1.push('12pm');

            }
            else {
              if (key < '10') {
                keys1.push(key.substring(1, 2) + 'am');
              }
              else {
                keys1.push(key + 'am');
              }
            }
            values1.push(value);
          })
          console.log(keys1);
          this.chart6 = new Chart('canvas6', {
            type: 'line',
            data: {
              labels: keys1,
              datasets: [
                {
                  label: 'Number of Api calls',
                  data: values1,
                  borderColor: '#DA680E',
                  fill: true
                },
              ]
            },

          })



          res['products'].forEach((x) => {

            if (x.date === this.inputdate) {
              var table1modelData: table1model = {
                api: x.api.substring(0, 1) + x.api.substring(x.api.split('/')[1].length + 2),
                module: x.api.split("/")[1],
                method: x.method,
                response: x.response,
                time: x.time,
                region: x.region,
                nowtime: x.nowtime,
              };

              this.table1.push(table1modelData);
            }
          })


          this.dataSource = new MatTableDataSource(this.table1);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;
          let keys111 = Array.from(this.bookingmap.keys());
          let keysone = [];
          keys111.forEach((x) => {
            if (x > '12') {
              let key1 = (+x) - 12;
              keysone.push(key1.toString() + 'pm');
            }
            else if (x === '12') {

              keysone.push('12pm');
            }
            else {
              if (x < '10') {
                keysone.push(x.toString().substring(1, 2) + 'am');
              }
              else {
                keysone.push(x + 'am');
              }
            }
          })
          let values111 = Array.from(this.bookingmap.values());
          this.chart1 = new Chart('canvas1', {
            type: 'line',
            data: {
              labels: keysone,
              datasets: [
                {
                  label: 'Number of Api calls in Booking portal',
                  data: values111,
                  borderColor: '#E1AD01',
                  //   backgroundColor:'#E1AD01'

                  fill: true
                },
              ]
            },

          })

          let keys22 = Array.from(this.subscriptionsmap.keys());
          let keystwo = [];
          keys22.forEach((x) => {
            if (x > '12') {
              let key1 = (+x) - 12;
              keystwo.push(key1.toString() + 'pm');
            }
            else if (x === '12') {

              keystwo.push('12pm');
            }
            else {
              if (x < '10') {
                keystwo.push(x.toString().substring(1, 2) + 'am');
              }
              else {
                keystwo.push(x + 'am');
              }
            }
          })
          let values22 = Array.from(this.subscriptionsmap.values());
          this.chart2 = new Chart('canvas2', {
            type: 'line',
            data: {
              labels: keystwo,
              datasets: [
                {
                  label: 'Number of Api calls in Subscriptions portal',
                  data: values22,
                  borderColor: '#6BA32D',

                  fill: true
                },
              ]
            },

          })



          let keys33 = Array.from(this.contentmap.keys());
          let keysthree = [];
          keys33.forEach((x) => {
            if (x > '12') {
              let key1 = (+x) - 12;
              keysthree.push(key1.toString() + 'pm');
            }
            else if (x === '12') {

              keysthree.push('12pm');
            }
            else {
              if (x < '10') {
                keysthree.push(x.toString().substring(1, 2) + 'am');
              }
              else {
                keysthree.push(x + 'am');
              }
            }
          })
          let values33 = Array.from(this.contentmap.values());
          this.chart3 = new Chart('canvas3', {
            type: 'line',
            data: {
              labels: keysthree,
              datasets: [
                {
                  label: 'Number of Api calls in Content portal',
                  data: values33,
                  borderColor: '#9867C5',
                  fill: true
                },
              ]
            },
          })


          let keys44 = Array.from(this.trainermap.keys());
          let keysfour = [];
          keys44.forEach((x) => {
            if (x > '12') {
              let key1 = (+x) - 12;
              keysfour.push(key1.toString() + 'pm');
            }
            else if (x === '12') {

              keysfour.push('12pm');
            }
            else {
              if (x < '10') {
                keysfour.push(x.toString().substring(1, 2) + 'am');
              }
              else {
                keysfour.push(x + 'am');
              }
            }
          })
          let values44 = Array.from(this.trainermap.values());
          this.chart4 = new Chart('canvas4', {
            type: 'line',
            data: {
              labels: keysfour,
              datasets: [
                {
                  label: 'Number of Api calls in Trainer portal',
                  data: values44,
                  borderColor: '#3A9BDC',
                  //  backgroundColor:'#3A9BDC'

                  fill: true
                },
              ]
            },

          })


          let keys55 = Array.from(this.operationmap.keys());
          let keysfive = [];
          keys55.forEach((x) => {
            if (x > '12') {
              let key1 = (+x) - 12;
              keysfive.push(key1.toString() + 'pm');
            }
            else if (x === '12') {

              keysfive.push('12pm');
            }
            else {
              if (x < '10') {
                keysfive.push(x.toString().substring(1, 2) + 'am');
              }
              else {
                keysfive.push(x + 'am');
              }
            }
          })
          let values55 = Array.from(this.operationmap.values());
          this.chart5 = new Chart('canvas5', {
            type: 'line',
            data: {
              labels: keysfive,
              datasets: [
                {
                  label: 'Number of Api calls in Operations portal',
                  data: values55,
                  borderColor: '#EB3C62',
                  fill: true
                },
              ]
            },

          })



          let keys66 = Array.from(this.apimap.keys());
          let values66 = Array.from(this.apimap.values());
          this.chart7 = new Chart('canvas7', {
            type: 'pie',
            data: {
              labels: keys66,
              datasets: [
                {
                  label: 'api usage',
                  data: values66,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#F25278',
                    'purple',
                    '#61B33B',
                    '#e1ad01',
                    'orange',
                    'red',
                    'grey',
                    'black',
                    'green',
                    'blue',
                    'yellow',
                    'pink'


                  ],
                  borderColor: [
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                  ],
                  borderWidth: 2
                },
              ]
            },
          })
        }
      })
  }


  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }


}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface IContactModelData {
  method: string;
  api: string;
  response: number;
}
interface IContactModelData1 {
  method: string;
  api: string;
  time: number;
  region: string;
}
interface IContactModelData2 {
  method: string;
  api: string;
  count: number;
  response: number;
  time: number;
  region: string;
}
interface IContactModelData3 {
  method: string;
  api: string;
  response: number;
  time: number;
}

@Component({
  selector: 'app-modulebasedata',
  templateUrl: './modulebasedata.component.html',
  styleUrls: ['./modulebasedata.component.css']
})
export class ModulebasedataComponent implements OnInit {
  @Input() data;
  modulename: any;
  users: any;
  timeoutarray: any = [];
  successarray: any = [];
  forbidarray: any = [];
  responsemap: any;
  keys1: any = [];
  keys11: any = [];
  keys3: any = [];
  keys33: any = [];
  iter: any;
  region: string = '';
  errormap: any = [];
  finally: any = [];
  apiarray: any = [];
  chart1: any = [];
  chart2: any = [];
  unchangedarray: any = [];
  displayedColumns1 = ['method', 'api', 'response'];
  displayedColumns3 = ['method', 'api', 'response'];
  displayedColumns2 = ['method', 'api', 'time', 'region'];
  displayedColumns4 = ['method', 'api', 'count', 'response', 'time', 'region'];
  forbidnum: any;
  oknum: any;
  c = 0;
  overtime: any;
  d = 0;
  notmodifiednum = 0;
  okidoki: string = '';
  moodule: string = '';
  firstdate: string = '';
  lastdate: string = '';
  countmap: any;
  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  dataSource3!: MatTableDataSource<any>;
  dataSource4!: MatTableDataSource<any>;
  dataSource5!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('paginator3') paginator3!: MatPaginator;
  @ViewChild('paginator4') paginator4!: MatPaginator;
  @ViewChild('paginator5') paginator5!: MatPaginator;

  constructor(private _weather: WeatherService) {
    this.modulename = this.data;
  }


  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe((res) => {
        this.okidoki = this.data + '';
        let splitarr = this.okidoki.split('$');

        if (this.okidoki.split('$').length > 3) {
          this.moodule = this.okidoki.split('$')[0];
          this.firstdate = this.okidoki.split('$')[1];
          this.lastdate = this.okidoki.split('$')[2];
          this.region = this.okidoki.split('$')[3];
        }
        else if (this.okidoki.split('$').length === 3 && this.okidoki.split('$')[1].indexOf('-') != -1 && this.okidoki.split('$')[2].indexOf('-') != -1) {
          this.region = '';
          this.moodule = this.okidoki.split('$')[0];
          this.firstdate = this.okidoki.split('$')[1];
          this.lastdate = this.okidoki.split('$')[2];
        }
        else if (this.okidoki.split('$').length === 3) {
          this.moodule = this.okidoki.split('$')[0];
          this.firstdate = '';
          this.lastdate = '';
          this.region = this.okidoki.split('$')[2];
        }
        else if (this.okidoki.split('$').length === 2) {
          this.moodule = this.okidoki.split('$')[0];
          this.firstdate = '';
          this.lastdate = '';
          this.region = '';
        }

        console.log(this.moodule + " " + this.firstdate + " se leke " + this.lastdate + " region: " + this.region);



        if (this.firstdate != undefined && this.lastdate != undefined && this.firstdate.indexOf('-') != -1 && this.lastdate.indexOf('-') != -1 && this.region === '') {

          console.log(this.firstdate + " tooooo " + this.lastdate);

          this.users = res['products'];
          this.iter = res['products'];
          this.iter.forEach((x) => {
            if ((x.time / 1000) >= 15 && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              var modelData: IContactModelData = {
                method: x.method,
                api: x.api,
                response: x.response
              };
              this.timeoutarray.push(modelData);
              this.d = this.d + 1;
            }
            this.overtime = this.d;
            if (this.overtime > 1000000) {
              this.overtime = this.overtime.toExponential();
            }

            if (x.response === 200 && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              var modelData1: IContactModelData1 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                region: x.region,
              };
              this.successarray.push(modelData1);
            }
            if (x.response != 200 && x.response != 304 && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              var modelData2: IContactModelData3 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                response: x.response,
              };
              this.forbidarray.push(modelData2);
            }
            if (x.response === 304 && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              var modelData3: IContactModelData1 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                region: x.region,
              };
              this.unchangedarray.push(modelData3);
            }

          })
          this.dataSource4 = new MatTableDataSource(this.timeoutarray);
          this.dataSource4.paginator = this.paginator4;
          this.dataSource4.sort = this.matSort;


          this.dataSource1 = new MatTableDataSource(this.successarray);
          this.dataSource1.paginator = this.paginator1;
          this.dataSource1.sort = this.matSort;

          this.dataSource2 = new MatTableDataSource(this.forbidarray);
          this.dataSource2.paginator = this.paginator2;
          this.dataSource2.sort = this.matSort;

          this.dataSource3 = new MatTableDataSource(this.unchangedarray);
          this.dataSource3.paginator = this.paginator3;
          this.dataSource3.sort = this.matSort;




          let responses = res['products'].map(res => res.response)
          this.responsemap = new Map();

          this.iter.forEach((x) => {
            if (this.responsemap.has(x.response) && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.responsemap.set(x.response, this.responsemap.get(x.response) + 1)
              this.c = this.c + 1;
            }
            else if (x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.responsemap.set(x.response, 1);
              this.c = this.c + 1;
            }

          })

          this.oknum = this.responsemap.has(200) ? this.responsemap.get(200) : 0;

          this.notmodifiednum = this.responsemap.has(304) ? this.responsemap.get(304) : 0;
          this.forbidnum = this.c - (this.oknum + this.notmodifiednum);
          if (this.oknum > 1000000) {
            this.oknum = this.oknum.toExponential();
          }
          if (this.forbidnum > 1000000) {
            this.forbidnum = this.forbidnum.toExponential();
          }
          if (this.overtime > 1000000) {
            this.overtime = this.overtime.toExponential();
          }


          this.countmap = new Map();
          this.iter.forEach((x) => {
            if (this.countmap.has(x.api) && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.countmap.set(x.api, this.countmap.get(x.api) + 1)
            }
            else if (x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.countmap.set(x.api, 1);
            }
          })



          this.users.forEach((x) => {
            if (x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              var modelData3: IContactModelData2 = {
                method: x.method,
                api: x.api,
                count: this.countmap.has(x.api) ? this.countmap.get(x.api) : 0,
                response: x.response,
                time: x.time / 1000,
                region: x.region,
              };
              this.finally.push(modelData3);
            }
          });
          this.dataSource = new MatTableDataSource(this.finally);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;



          this.errormap = new Map();
          this.iter.forEach((x) => {
            if (this.errormap.has(x.api) && x.api.split("/")[1] === this.moodule
              && x.response != 200 && x.response != 304 && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.errormap.set(x.api, this.errormap.get(x.api) + 1)
            }
            else if (x.api.split("/")[1] === this.moodule && x.response != 200 && x.response != 304 && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.errormap.set(x.api, 1);
            }
          })

          this.keys1 = Array.from(this.countmap.keys());

          this.keys1.forEach((x) => {
            this.keys11.push(x.substring(0, 1) + x.substring(x.split('/')[1].length + 2));
          })
          let values1 = Array.from(this.countmap.values());
          this.keys3 = Array.from(this.errormap.keys());
          this.keys3.forEach((x) => {
            this.keys33.push(x.substring(0, 1) + x.substring(x.split('/')[1].length + 2));
          })
          let values3 = Array.from(this.errormap.values());
          values3.push(0);
          this.chart1 = new Chart('canvas1', {
            type: 'pie',
            data: {
              labels: this.keys11,
              datasets: [
                {
                  label: 'apis with errors',
                  data: values1,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#F25278',
                    'purple',
                    '#61B33B',
                    '#e1ad01',
                    '#F25278',
                    '#008080',
                    'orange',
                    '#e1ad01'
                  ],
                  borderColor: [
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                  ],
                  borderWidth: 1
                },
              ]
            },


          })







          this.chart2 = new Chart('canvas2', {
            type: 'pie',
            data: {
              labels: this.keys33,
              datasets: [
                {
                  label: 'Apis with number of errors',
                  data: values3,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#F25278',
                    'purple',
                    '#61B33B',
                    '#e1ad01',
                    '#F25278',
                    '#008080',
                    'orange',
                    '#e1ad01'
                  ],
                  borderColor: [
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                  ],
                  borderWidth: 1
                },
              ]
            },


          })

        }


        else if (this.firstdate.indexOf('-') === -1 && this.lastdate.indexOf('-') === -1 && this.region === '') {

          this.users = res['products'];
          this.iter = res['products'];
          this.iter.forEach((x) => {
            if ((x.time / 1000) >= 15 && x.api.split("/")[1] === this.moodule) {
              var modelData: IContactModelData = {
                method: x.method,
                api: x.api,
                response: x.response
              };
              this.timeoutarray.push(modelData);
              this.d = this.d + 1;
            }
            this.overtime = this.d;
            if (this.overtime > 1000000) {
              this.overtime = this.overtime.toExponential();
            }

            if (x.response === 200 && x.api.split("/")[1] === this.moodule) {
              var modelData1: IContactModelData1 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                region: x.region,
              };
              this.successarray.push(modelData1);
            }
            if (x.response != 200 && x.response != 304 && x.api.split("/")[1] === this.moodule) {
              var modelData2: IContactModelData3 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                response: x.response,
              };
              this.forbidarray.push(modelData2);
            }
            if (x.response === 304 && x.api.split("/")[1] === this.moodule) {
              var modelData3: IContactModelData1 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                region: x.region,
              };
              this.unchangedarray.push(modelData3);
            }

          })
          this.dataSource4 = new MatTableDataSource(this.timeoutarray);
          this.dataSource4.paginator = this.paginator4;
          this.dataSource4.sort = this.matSort;


          this.dataSource1 = new MatTableDataSource(this.successarray);
          this.dataSource1.paginator = this.paginator1;
          this.dataSource1.sort = this.matSort;

          this.dataSource2 = new MatTableDataSource(this.forbidarray);
          this.dataSource2.paginator = this.paginator2;
          this.dataSource2.sort = this.matSort;

          this.dataSource3 = new MatTableDataSource(this.unchangedarray);
          this.dataSource3.paginator = this.paginator3;
          this.dataSource3.sort = this.matSort;




          let responses = res['products'].map(res => res.response)
          this.responsemap = new Map();

          this.iter.forEach((x) => {
            if (this.responsemap.has(x.response) && x.api.split("/")[1] === this.moodule) {
              this.responsemap.set(x.response, this.responsemap.get(x.response) + 1)
              this.c = this.c + 1;
            }
            else if (x.api.split("/")[1] === this.moodule) {
              this.responsemap.set(x.response, 1);
              this.c = this.c + 1;
            }

          })

          this.oknum = this.responsemap.has(200) ? this.responsemap.get(200) : 0;
          this.notmodifiednum = this.responsemap.has(304) ? this.responsemap.get(304) : 0;
          this.forbidnum = this.c - (this.oknum + this.notmodifiednum);
          if (this.oknum > 1000000) {
            this.oknum = this.oknum.toExponential();
          }
          if (this.forbidnum > 1000000) {
            this.forbidnum = this.forbidnum.toExponential();
          }



          this.countmap = new Map();
          this.iter.forEach((x) => {
            if (this.countmap.has(x.api) && x.api.split("/")[1] === this.moodule) {
              this.countmap.set(x.api, this.countmap.get(x.api) + 1)
            }
            else if (x.api.split("/")[1] === this.moodule) {
              this.countmap.set(x.api, 1);
            }
          })



          this.users.forEach((x) => {
            if (x.api.split("/")[1] === this.moodule) {
              var modelData3: IContactModelData2 = {
                method: x.method,
                api: x.api,
                count: this.countmap.has(x.api) ? this.countmap.get(x.api) : 0,
                response: x.response,
                time: x.time / 1000,
                region: x.region,
              };
              this.finally.push(modelData3);
            }
          });
          this.dataSource = new MatTableDataSource(this.finally);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;



          this.errormap = new Map();
          this.iter.forEach((x) => {
            if (this.errormap.has(x.api) && x.api.split("/")[1] === this.moodule
              && x.response != 200 && x.response != 304) {
              this.errormap.set(x.api, this.errormap.get(x.api) + 1)
            }
            else if (x.api.split("/")[1] === this.moodule && x.response != 200 && x.response != 304) {
              this.errormap.set(x.api, 1);
            }
          })

          this.keys1 = Array.from(this.countmap.keys());

          this.keys1.forEach((x) => {
            this.keys11.push(x.substring(0, 1) + x.substring(x.split('/')[1].length + 2));
          })
          let values1 = Array.from(this.countmap.values());

          this.keys3 = Array.from(this.errormap.keys());
          this.keys3.forEach((x) => {
            this.keys33.push(x.substring(0, 1) + x.substring(x.split('/')[1].length + 2));
          })
          let values3 = Array.from(this.errormap.values());
          values3.push(0);
          this.chart1 = new Chart('canvas1', {
            type: 'pie',
            data: {
              labels: this.keys11,
              datasets: [
                {
                  label: 'apis with errors',
                  data: values1,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#F25278',
                    'purple',
                    '#61B33B',
                    '#e1ad01',
                    '#F25278',
                    '#008080',
                    'orange',
                    '#e1ad01'
                  ],
                  borderColor: [
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                  ],
                  borderWidth: 1
                },
              ]
            },

          })

          this.chart2 = new Chart('canvas2', {
            type: 'pie',
            data: {
              labels: this.keys33,
              datasets: [
                {
                  label: 'Apis with number of errors',
                  data: values3,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#F25278',
                    'purple',
                    '#61B33B',
                    '#e1ad01',
                    '#F25278',
                    '#008080',
                    'orange',
                    '#e1ad01'
                  ],
                  borderColor: [
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                  ],
                  borderWidth: 1
                },
              ]
            },


          })


        }


        else if (this.firstdate != undefined && this.lastdate != undefined && this.firstdate.indexOf('-') != -1 && this.lastdate.indexOf('-') != -1 && this.region.length > 1) {

          console.log(this.firstdate + " tooooo " + this.lastdate);

          this.users = res['products'];
          this.iter = res['products'];
          this.iter.forEach((x) => {
            if ((x.time / 1000) >= 15 && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate) && (x.region === this.region)) {
              var modelData: IContactModelData = {
                method: x.method,
                api: x.api,
                response: x.response
              };
              this.timeoutarray.push(modelData);
              this.d = this.d + 1;
            }
            this.overtime = this.d;
            if (this.overtime > 1000000) {
              this.overtime = this.overtime.toExponential();
            }

            if (x.response === 200 && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate) && (x.region === this.region)) {
              var modelData1: IContactModelData1 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                region: x.region,
              };
              this.successarray.push(modelData1);
            }
            if (x.response != 200 && x.response != 304 && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate) && (x.region === this.region)) {
              var modelData2: IContactModelData3 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                response: x.response,
              };
              this.forbidarray.push(modelData2);
            }
            if (x.response === 304 && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate) && (x.region === this.region)) {
              var modelData3: IContactModelData1 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                region: x.region,
              };
              this.unchangedarray.push(modelData3);
            }

          })
          this.dataSource4 = new MatTableDataSource(this.timeoutarray);
          this.dataSource4.paginator = this.paginator4;
          this.dataSource4.sort = this.matSort;


          this.dataSource1 = new MatTableDataSource(this.successarray);
          this.dataSource1.paginator = this.paginator1;
          this.dataSource1.sort = this.matSort;

          this.dataSource2 = new MatTableDataSource(this.forbidarray);
          this.dataSource2.paginator = this.paginator2;
          this.dataSource2.sort = this.matSort;

          this.dataSource3 = new MatTableDataSource(this.unchangedarray);
          this.dataSource3.paginator = this.paginator3;
          this.dataSource3.sort = this.matSort;




          let responses = res['products'].map(res => res.response)
          this.responsemap = new Map();

          this.iter.forEach((x) => {
            if (this.responsemap.has(x.response) && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate) && (x.region === this.region)) {
              this.responsemap.set(x.response, this.responsemap.get(x.response) + 1)
              this.c = this.c + 1;
            }
            else if (x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate) && (x.region === this.region)) {
              this.responsemap.set(x.response, 1);
              this.c = this.c + 1;
            }

          })

          this.oknum = this.responsemap.has(200) ? this.responsemap.get(200) : 0;
          this.notmodifiednum = this.responsemap.has(304) ? this.responsemap.get(304) : 0;
          this.forbidnum = this.c - (this.oknum + this.notmodifiednum);
          if (this.oknum > 1000000) {
            this.oknum = this.oknum.toExponential();
          }
          if (this.forbidnum > 1000000) {
            this.forbidnum = this.forbidnum.toExponential();
          }
          if (this.overtime > 1000000) {
            this.overtime = this.overtime.toExponential();
          }


          this.countmap = new Map();
          this.iter.forEach((x) => {
            if (this.countmap.has(x.api) && x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate) && (x.region === this.region)) {
              this.countmap.set(x.api, this.countmap.get(x.api) + 1)
            }
            else if (x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate) && (x.region === this.region)) {
              this.countmap.set(x.api, 1);
            }
          })



          this.users.forEach((x) => {
            if (x.api.split("/")[1] === this.moodule && (x.date >= this.firstdate && x.date <= this.lastdate) && (x.region === this.region)) {
              var modelData3: IContactModelData2 = {
                method: x.method,
                api: x.api,
                count: this.countmap.has(x.api) ? this.countmap.get(x.api) : 0,
                response: x.response,
                time: x.time / 1000,
                region: x.region,
              };
              this.finally.push(modelData3);
            }
          });
          this.dataSource = new MatTableDataSource(this.finally);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;



          this.errormap = new Map();
          this.iter.forEach((x) => {
            if (this.errormap.has(x.api) && x.api.split("/")[1] === this.moodule
              && x.response != 200 && x.response != 304 && (x.date >= this.firstdate && x.date <= this.lastdate) && (x.region === this.region)) {
              this.errormap.set(x.api, this.errormap.get(x.api) + 1)
            }
            else if (x.api.split("/")[1] === this.moodule && x.response != 200 && x.response != 304 && (x.date >= this.firstdate && x.date <= this.lastdate) && (x.region === this.region)) {
              this.errormap.set(x.api, 1);
            }
          })

          this.keys1 = Array.from(this.countmap.keys());

          this.keys1.forEach((x) => {
            this.keys11.push(x.substring(0, 1) + x.substring(x.split('/')[1].length + 2));
          })
          let values1 = Array.from(this.countmap.values());
          this.keys3 = Array.from(this.errormap.keys());
          this.keys3.forEach((x) => {
            this.keys33.push(x.substring(0, 1) + x.substring(x.split('/')[1].length + 2));
          })
          let values3 = Array.from(this.errormap.values());
          values3.push(0);
          this.chart1 = new Chart('canvas1', {
            type: 'pie',
            data: {
              labels: this.keys11,
              datasets: [
                {
                  label: 'apis with errors',
                  data: values1,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#F25278',
                    'purple',
                    '#61B33B',
                    '#e1ad01',
                    '#F25278',
                    '#008080',
                    'orange',
                    '#e1ad01'
                  ],
                  borderColor: [
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                  ],
                  borderWidth: 1
                },
              ]
            },


          })


          this.chart2 = new Chart('canvas2', {
            type: 'pie',
            data: {
              labels: this.keys33,
              datasets: [
                {
                  label: 'Apis with number of errors',
                  data: values3,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#F25278',
                    'purple',
                    '#61B33B',
                    '#e1ad01',
                    '#F25278',
                    '#008080',
                    'orange',
                    '#e1ad01'
                  ],
                  borderColor: [
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                  ],
                  borderWidth: 1
                },
              ]
            },


          })





        }


        else if (this.firstdate.indexOf('-') === -1 && this.lastdate.indexOf('-') === -1 && this.region.length > 1) {
          console.log(this.firstdate + " tooooo " + this.lastdate);

          this.users = res['products'];
          this.iter = res['products'];
          this.iter.forEach((x) => {
            if ((x.time / 1000) >= 15 && x.api.split("/")[1] === this.moodule && (x.region === this.region)) {
              var modelData: IContactModelData = {
                method: x.method,
                api: x.api,
                response: x.response
              };
              this.timeoutarray.push(modelData);
              this.d = this.d + 1;
            }
            this.overtime = this.d;
            if (this.overtime > 1000000) {
              this.overtime = this.overtime.toExponential();
            }

            if (x.response === 200 && x.api.split("/")[1] === this.moodule && (x.region === this.region)) {
              var modelData1: IContactModelData1 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                region: x.region,
              };
              this.successarray.push(modelData1);
            }
            if (x.response != 200 && x.response != 304 && x.api.split("/")[1] === this.moodule && (x.region === this.region)) {
              var modelData2: IContactModelData3 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                response: x.response,
              };
              this.forbidarray.push(modelData2);
            }
            if (x.response === 304 && x.api.split("/")[1] === this.moodule && (x.region === this.region)) {
              var modelData3: IContactModelData1 = {
                method: x.method,
                api: x.api,
                time: x.time / 1000,
                region: x.region,
              };
              this.unchangedarray.push(modelData3);
            }

          })
          this.dataSource4 = new MatTableDataSource(this.timeoutarray);
          this.dataSource4.paginator = this.paginator4;
          this.dataSource4.sort = this.matSort;


          this.dataSource1 = new MatTableDataSource(this.successarray);
          this.dataSource1.paginator = this.paginator1;
          this.dataSource1.sort = this.matSort;

          this.dataSource2 = new MatTableDataSource(this.forbidarray);
          this.dataSource2.paginator = this.paginator2;
          this.dataSource2.sort = this.matSort;

          this.dataSource3 = new MatTableDataSource(this.unchangedarray);
          this.dataSource3.paginator = this.paginator3;
          this.dataSource3.sort = this.matSort;




          let responses = res['products'].map(res => res.response)
          this.responsemap = new Map();

          this.iter.forEach((x) => {
            if (this.responsemap.has(x.response) && x.api.split("/")[1] === this.moodule && (x.region === this.region)) {
              this.responsemap.set(x.response, this.responsemap.get(x.response) + 1)
              this.c = this.c + 1;
            }
            else if (x.api.split("/")[1] === this.moodule && (x.region === this.region)) {
              this.responsemap.set(x.response, 1);
              this.c = this.c + 1;
            }

          })

          this.oknum = this.responsemap.has(200) ? this.responsemap.get(200) : 0;
          this.notmodifiednum = this.responsemap.has(304) ? this.responsemap.get(304) : 0;
          this.forbidnum = this.c - (this.oknum + this.notmodifiednum);
          if (this.oknum > 1000000) {
            this.oknum = this.oknum.toExponential();
          }
          if (this.forbidnum > 1000000) {
            this.forbidnum = this.forbidnum.toExponential();
          }
          if (this.overtime > 1000000) {
            this.overtime = this.overtime.toExponential();
          }


          this.countmap = new Map();
          this.iter.forEach((x) => {
            if (this.countmap.has(x.api) && x.api.split("/")[1] === this.moodule && (x.region === this.region)) {
              this.countmap.set(x.api, this.countmap.get(x.api) + 1)
            }
            else if (x.api.split("/")[1] === this.moodule && (x.region === this.region)) {
              this.countmap.set(x.api, 1);
            }
          })



          this.users.forEach((x) => {
            if (x.api.split("/")[1] === this.moodule && (x.region === this.region)) {
              var modelData3: IContactModelData2 = {
                method: x.method,
                api: x.api,
                count: this.countmap.has(x.api) ? this.countmap.get(x.api) : 0,
                response: x.response,
                time: x.time / 1000,
                region: x.region,
              };
              this.finally.push(modelData3);
            }
          });
          this.dataSource = new MatTableDataSource(this.finally);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;



          this.errormap = new Map();
          this.iter.forEach((x) => {
            if (this.errormap.has(x.api) && x.api.split("/")[1] === this.moodule
              && x.response != 200 && x.response != 304 && (x.region === this.region)) {
              this.errormap.set(x.api, this.errormap.get(x.api) + 1)
            }
            else if (x.api.split("/")[1] === this.moodule && x.response != 200 && x.response != 304 && (x.region === this.region)) {
              this.errormap.set(x.api, 1);
            }
          })

          this.keys1 = Array.from(this.countmap.keys());

          this.keys1.forEach((x) => {
            this.keys11.push(x.substring(0, 1) + x.substring(x.split('/')[1].length + 2));
          })
          let values1 = Array.from(this.countmap.values());
          this.keys3 = Array.from(this.errormap.keys());
          this.keys3.forEach((x) => {
            this.keys33.push(x.substring(0, 1) + x.substring(x.split('/')[1].length + 2));
          })
          let values3 = Array.from(this.errormap.values());
          values3.push(0);
          this.chart1 = new Chart('canvas1', {
            type: 'pie',
            data: {
              labels: this.keys11,
              datasets: [
                {
                  label: 'apis with errors',
                  data: values1,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#F25278',
                    'purple',
                    '#61B33B',
                    '#e1ad01',
                    '#F25278',
                    '#008080',
                    'orange',
                    '#e1ad01'
                  ],
                  borderColor: [
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                  ],
                  borderWidth: 1
                },
              ]
            },


          })


          this.chart2 = new Chart('canvas2', {
            type: 'pie',
            data: {
              labels: this.keys33,
              datasets: [
                {
                  label: 'Apis with number of errors',
                  data: values3,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#F25278',
                    'purple',
                    '#61B33B',
                    '#e1ad01',
                    '#F25278',
                    '#008080',
                    'orange',
                    '#e1ad01'
                  ],
                  borderColor: [
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                  ],
                  borderWidth: 1
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

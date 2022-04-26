import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
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
}
interface model1 {
  module: string;
  count: number;
}
interface model {
  module: string;
  count: number;
  time: number;
}
interface table1model {
  method: string;
  module: string;
  api: string;
  response: number;
  time: number;
  region: string;
}
interface extra {
  module: string;
  region: string;
  api: string;
}

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.css']
})
export class MaindashboardComponent implements OnInit {

  title = 'final-insights';
  @Input() data;
  see: string = '';
  firstdate: string = '';
  lastdate: string = '';
  forbidnum = 0;
  oknum = 0;
  i = 0;
  p: any;
  q: any;
  max1 = 0;
  users1: any;
  overtime = 0;
  timemap: any;
  regionmap: any;
  notmodifiednum = 0;
  users: any;
  set: any;
  modulearray: any = [];
  timetable: any = [];
  responsetable: any = [];
  responsemap: any;
  finalmap: Map<string, number[]>;
  countmap: any;
  table1: any = [];
  countmap1: any;
  moduletable: any = [];
  map200: any;
  map304: any;
  regioncount: any = [];
  map4__: any;
  maxregion = '';
  maxregion1 = '';
  modulos: any = [];
  chart: any = [];
  chart1: any = [];
  chart2: any = [];
  chart3: any = [];
  chart4: any = [];
  chart5: any = [];
  iter: any;
  variable: any;
  mapofregion: any = [];
  mapofregion1: any = [];
  values22: any = [];
  values33: any = [];
  values44: any = [];
  region: string = '';
  modulecount: any = [];
  max = 0;
  field = 'products';


  displayedColumns = ['method', 'module', 'api', 'response', 'time', 'region'];
  displayedColumns1 = ['method', 'api', 'response'];
  displayedColumns2 = ['method', 'api', 'time'];
  displayedColumns3 = ['module', 'count', 'time'];
  displayedColumns9 = ['module', 'region', 'api'];
  dataSource!: MatTableDataSource<any>;
  dataSource5!: MatTableDataSource<any>;
  dataSource6!: MatTableDataSource<any>;
  dataSource9!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  @ViewChild('paginator5') paginator5!: MatPaginator;
  @ViewChild('paginator6') paginator6!: MatPaginator;
  @ViewChild('paginator9') paginator9!: MatPaginator;
  constructor(private _weather: WeatherService) {
  }

  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe((res) => {
        // debugger;
        this.see = this.data + '';
        /////////////////////////////////////
        /////////////////////////////////
        if (this.see.split('$').length > 2) {
          this.firstdate = this.see.split('$')[0];
          this.lastdate = this.see.split('$')[1];
          this.region = this.see.split('$')[2];
        }
        else if (this.see.split('$').length === 2 && this.see.split('$')[0].indexOf('-') != -1 && this.see.split('$')[1].indexOf('-') != -1) {
          this.region = '';
          this.firstdate = this.see.split('$')[0];
          this.lastdate = this.see.split('$')[1];
        }
        else if (this.see.split('$').length === 2) {
          this.region = this.see.split('$')[1];
        }

        console.log(this.firstdate + " se leke " + this.lastdate + " region: " + this.region);
        if (this.firstdate.indexOf('-') != -1 && this.lastdate.indexOf('-') != -1 && this.region === '') {
          console.log(this.firstdate + " tooooo1 " + this.lastdate);
          res['products'].forEach((x) => {
            if (x.date >= this.firstdate && x.date <= this.lastdate) {
              var table1modelData: table1model = {
                api: x.api,
                module: x.api.split("/")[1],
                method: x.method,
                response: x.response,
                time: x.time,
                region: x.region,
              };

              this.table1.push(table1modelData);
            }
          })


          this.dataSource = new MatTableDataSource(this.table1);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;
          this.iter = res['products'];

          this.countmap = new Map();
          res['products'].forEach((x) => {
            if (x.date >= this.firstdate && x.date <= this.lastdate) {
              this.modulos.push(x.api.split("/")[1]);
            }
          })

          this.set = new Set();
          res['products'].forEach((x) => {
            if (x.date >= this.firstdate && x.date <= this.lastdate) {
              this.set.add(x.api.split("/")[1]);
            }
          })


          this.p = new Map();
          res['products'].forEach((x) => {
            if (!this.p.has(x.api.split('/')[1]) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.p.set((x.api.split('/')[1]), new Map());
              this.p.get(x.api.split('/')[1]).set(x.region, 1);

            }
            else if (this.p.has(x.api.split('/')[1]) && !(this.p.get(x.api.split('/')[1]).has(x.region)) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.p.get(x.api.split('/')[1]).set(x.region, 1);

            }
            else if (this.p.has(x.api.split('/')[1]) && this.p.get(x.api.split('/')[1]).has(x.region) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.p.get(x.api.split('/')[1]).set(x.region, this.p.get(x.api.split('/')[1]).get(x.region) + 1);

            }

          })

          this.p.forEach((value: any, key: string) => {
            this.max = 0;
            this.maxregion = '';
            value.forEach((value: number, key: string) => {
              if (value > this.max) {
                this.max = value;
                this.maxregion = key;
              }
            })
            this.mapofregion.push(this.maxregion);

          })






          this.q = new Map();
          res['products'].forEach((x) => {
            if (!this.q.has(x.api.split('/')[1]) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.q.set((x.api.split('/')[1]), new Map());
              this.q.get(x.api.split('/')[1]).set(x.api, 1);

            }
            else if (this.q.has(x.api.split('/')[1]) && !(this.q.get(x.api.split('/')[1]).has(x.api)) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.q.get(x.api.split('/')[1]).set(x.api, 1);

            }
            else if (this.q.has(x.api.split('/')[1]) && this.q.get(x.api.split('/')[1]).has(x.api) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.q.get(x.api.split('/')[1]).set(x.api, this.q.get(x.api.split('/')[1]).get(x.api) + 1);

            }

          })

          this.q.forEach((value: any, key: string) => {
            this.max1 = 0;
            this.maxregion1 = '';
            value.forEach((value: number, key: string) => {
              if (value > this.max1) {
                this.max1 = value;
                this.maxregion1 = key;
              }
            })
            this.mapofregion1.push(this.maxregion1);

          })

          let mn = 0;
          this.set.forEach((x) => {
            var modelData9: extra = {
              module: x,
              region: this.mapofregion[mn],
              api: this.mapofregion1[mn]
            };
            mn = mn + 1;
            this.regioncount.push(modelData9);
          })


          this.dataSource9 = new MatTableDataSource(this.regioncount);
          this.dataSource9.paginator = this.paginator9;

          res['products'].forEach((x) => {
            if (this.countmap.has(x.api.split("/")[1]) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.countmap.set(x.api.split("/")[1], this.countmap.get(x.api.split("/")[1]) + 1)
            }
            else if (x.date >= this.firstdate && x.date <= this.lastdate) {
              this.countmap.set(x.api.split("/")[1], 1);
            }
          })
          this.countmap.forEach((value: number, key: string) => {
            var modelData5: model1 = {
              module: key,
              count: value
            };
            this.modulecount.push(modelData5);
          })

          this.dataSource5 = new MatTableDataSource(this.modulecount);
          this.dataSource5.paginator = this.paginator5;
          this.timemap = new Map();
          this.variable = res['products'];
          this.variable.forEach((x) => {
            if (this.timemap.has(x.api.split("/")[1]) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.timemap.set(x.api.split("/")[1], this.timemap.get(x.api.split("/")[1]) + x.time);
            }
            else if (x.date >= this.firstdate && x.date <= this.lastdate) {
              this.timemap.set(x.api.split("/")[1], x.time);
            }
          })
          this.regionmap = new Map();
          this.variable.forEach((x) => {

          })


          this.timemap.forEach((value: number, key: string) => {
            var modelData2: model = {
              module: key,
              count: this.countmap.has(key) ? this.countmap.get(key) : 0,
              time: Math.round(value / (this.countmap.has(key) ? this.countmap.get(key) : 0)),

            };
            this.modulearray.push(modelData2);
          });
          this.dataSource6 = new MatTableDataSource(this.modulearray);
          this.dataSource6.paginator = this.paginator6;


          let apis = res['products'].map(res => res.api)
          this.countmap1 = new Map();
          res['products'].forEach((x) => {
            if (this.countmap1.has(x.api) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.countmap1.set(x.api, this.countmap1.get(x.api) + 1);
            }
            else if (x.date >= this.firstdate && x.date <= this.lastdate) {
              this.countmap1.set(x.api, 1);
            }
          })
          res['products'].forEach((x) => {
            if ((x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.responsetable.push(x.response);
            }
          })
          this.responsemap = new Map();

          res['products'].forEach((x) => {
            if (this.responsemap.has(x.response) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.responsemap.set(x.response, this.responsemap.get(x.response) + 1);
            }
            else if (x.date >= this.firstdate && x.date <= this.lastdate) {
              this.responsemap.set(x.response, 1);
            }
          })
          this.forbidnum = this.responsemap.has(404) ? this.responsemap.get(404) : 0;
          this.oknum = this.responsemap.has(200) ? this.responsemap.get(200) : 0;
          this.notmodifiednum = this.responsemap.has(304) ? this.responsemap.get(304) : 0;

          res['products'].forEach((x) => {
            if ((x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.timetable.push(x.time / 1000);
            }
          })
          let methods = res['products'].map(res => res.method)



          this.map200 = new Map();
          this.map304 = new Map();
          this.finalmap = new Map<string, number[]>();
          this.map4__ = new Map();
          this.users = res['products'];
          this.users1 = res['products'];
          this.users.forEach((x) => {
            if (this.map200.has(x.api.split("/")[1]) && x.response === 200 && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map200.set(x.api.split("/")[1], this.map200.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response === 200 && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map200.set(x.api.split("/")[1], 1);
            }
          });

          this.users1.forEach((x) => {
            if (this.map304.has(x.api.split("/")[1]) && x.response === 304 && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map304.set(x.api.split("/")[1], this.map304.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response === 304 && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map304.set(x.api.split("/")[1], 1);
            }
          });
          this.users1.forEach((x) => {
            if (this.map4__.has(x.api.split("/")[1]) && x.response != 304 && x.response != 200 && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map4__.set(x.api.split("/")[1], this.map4__.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response != 304 && x.response != 200 && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map4__.set(x.api.split("/")[1], 1);
            }
          });



          this.set.forEach((x) => {
            this.finalmap.set(x, [this.map200.has(x) ? this.map200.get(x) : 0, this.map304.has(x) ? this.map304.get(x) : 0, this.map4__.has(x) ? this.map4__.get(x) : 0]);
          })

          let keys2: any = [];
          this.finalmap.forEach((value: number[], key: string) => {
            keys2.push(key);
          })
          this.finalmap.forEach((value: number[], key: string) => {

            this.values22.push(value[0]);
            this.values33.push(value[1]);
            this.values44.push(value[2]);
          });
          this.values22.push(0);
          this.values33.push(0);
          this.values44.push(0);
          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels: keys2,
              datasets: [
                {
                  label: 'no. of success responses',
                  data: this.values22,
                  backgroundColor: [
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',

                  ],
                  borderColor: [
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                  ],
                  // fill: false
                },

                {
                  label: 'no. of error responses',
                  data: this.values44,
                  backgroundColor: [
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                  ],
                  borderColor: [
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                  ],
                  // fill: false
                },
              ]
            },
          })
          let keys1 = Array.from(this.countmap1.keys());
          let values1 = Array.from(this.countmap1.values());
          this.chart2 = new Chart('canvas2', {
            type: 'line',
            data: {
              labels: this.modulos,
              datasets: [
                {
                  label: 'time of module in seconds',
                  data: this.timetable,
                  borderColor: '#DA680E',

                  fill: true
                },
              ]
            },

          })


          this.chart5 = new Chart('canvas5', {
            type: 'line',
            data: {
              labels: this.modulos,
              datasets: [

                {
                  label: 'response code of module',
                  data: this.responsetable,
                  borderColor: '#008080',
                  //  backgroundColor:'green'
                  fill: true,

                },
              ]
            },

          })


          let keys = Array.from(this.countmap.keys());
          let values = Array.from(this.countmap.values());
          this.chart4 = new Chart('canvas4', {
            type: 'pie',
            data: {
              labels: keys,
              datasets: [
                {
                  label: 'number of calls for a module',
                  data: values,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#4BBF91',
                    'orange',
                    'purple',
                    '#F25278',
                    '#61B33B',
                    'red',
                    'brown',
                    'blue',
                    'grey',
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

        else if (this.region === '' && this.firstdate.indexOf('-') === -1 && this.lastdate.indexOf('-') === -1) {

          console.log(this.firstdate + "toooooooooooooo" + this.lastdate);
          this.dataSource = new MatTableDataSource(res['products']);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;
          this.iter = res['products'];

          this.countmap = new Map();
          this.modulos = res['products'].map(res => res.api.split("/")[1])
          this.set = new Set();
          this.modulos.forEach((x) => {
            this.set.add(x);
          })
          this.p = new Map();
          res['products'].forEach((x) => {
            if (!this.p.has(x.api.split('/')[1])) {
              this.p.set((x.api.split('/')[1]), new Map());
              this.p.get(x.api.split('/')[1]).set(x.region, 1);

            }
            else if (this.p.has(x.api.split('/')[1]) && !(this.p.get(x.api.split('/')[1]).has(x.region))) {
              this.p.get(x.api.split('/')[1]).set(x.region, 1);

            }
            else if (this.p.has(x.api.split('/')[1]) && this.p.get(x.api.split('/')[1]).has(x.region)) {
              this.p.get(x.api.split('/')[1]).set(x.region, this.p.get(x.api.split('/')[1]).get(x.region) + 1);

            }

          })

          this.p.forEach((value: any, key: string) => {
            this.max = 0;
            this.maxregion = '';
            value.forEach((value: number, key: string) => {
              if (value > this.max) {
                this.max = value;
                this.maxregion = key;
              }
            })
            this.mapofregion.push(this.maxregion);

          })


          this.q = new Map();
          res['products'].forEach((x) => {
            if (!this.q.has(x.api.split('/')[1])) {
              this.q.set((x.api.split('/')[1]), new Map());
              this.q.get(x.api.split('/')[1]).set(x.api, 1);

            }
            else if (this.q.has(x.api.split('/')[1]) && !(this.q.get(x.api.split('/')[1]).has(x.api))) {
              this.q.get(x.api.split('/')[1]).set(x.api, 1);

            }
            else if (this.q.has(x.api.split('/')[1]) && this.q.get(x.api.split('/')[1]).has(x.api)) {
              this.q.get(x.api.split('/')[1]).set(x.api, this.q.get(x.api.split('/')[1]).get(x.api) + 1);

            }

          })

          this.q.forEach((value: any, key: string) => {
            this.max1 = 0;
            this.maxregion1 = '';
            value.forEach((value: number, key: string) => {
              if (value > this.max1) {
                this.max1 = value;
                this.maxregion1 = key;
              }
            })
            this.mapofregion1.push(this.maxregion1);

          })

          let mn = 0;
          this.set.forEach((x) => {
            var modelData9: extra = {
              module: x,
              region: this.mapofregion[mn],
              api: this.mapofregion1[mn]
            };
            mn = mn + 1;
            this.regioncount.push(modelData9);
          })


          this.dataSource9 = new MatTableDataSource(this.regioncount);
          this.dataSource9.paginator = this.paginator9;

          res['products'].forEach((x) => {
            this.timetable.push(x.time / 1000);
          })
          res['products'].forEach((x) => {
            this.responsetable.push(x.response);
          })
          this.modulos.forEach((x) => {
            if (this.countmap.has(x)) {
              this.countmap.set(x, this.countmap.get(x) + 1)
            }
            else {
              this.countmap.set(x, 1);
            }
          })

          this.countmap.forEach((value: number, key: string) => {
            var modelData5: model1 = {
              module: key,
              count: value
            };
            this.modulecount.push(modelData5);
          })

          this.dataSource5 = new MatTableDataSource(this.modulecount);
          this.dataSource5.paginator = this.paginator5;

          this.timemap = new Map();
          this.variable = res['products'];
          this.variable.forEach((x) => {
            if (this.timemap.has(x.api.split("/")[1])) {
              this.timemap.set(x.api.split("/")[1], this.timemap.get(x.api.split("/")[1]) + x.time);
            }
            else {
              this.timemap.set(x.api.split("/")[1], x.time);
            }
          })




          this.timemap.forEach((value: number, key: string) => {
            var modelData2: model = {
              module: key,
              count: this.countmap.has(key) ? this.countmap.get(key) : 0,
              time: Math.round(this.countmap.has(key) ? value / (this.countmap.get(key)) : 0),

            };
            this.modulearray.push(modelData2);
          });
          this.dataSource6 = new MatTableDataSource(this.modulearray);
          this.dataSource6.paginator = this.paginator6;


          let apis = res['products'].map(res => res.api)
          this.countmap1 = new Map();
          apis.forEach((x) => {
            if (this.countmap1.has(x)) {
              this.countmap1.set(x, this.countmap1.get(x) + 1)
            }
            else {
              this.countmap1.set(x, 1);
            }
          })
          let responses = res['products'].map(res => res.response)
          this.responsemap = new Map();

          responses.forEach((x) => {
            if (this.responsemap.has(x)) {
              this.responsemap.set(x, this.responsemap.get(x) + 1)
            }
            else {
              this.responsemap.set(x, 1);
            }
          })
          this.forbidnum = this.responsemap.has(404) ? this.responsemap.get(404) : 0;
          this.oknum = this.responsemap.has(200) ? this.responsemap.get(200) : 0;
          this.notmodifiednum = this.responsemap.has(304) ? this.responsemap.get(304) : 0;

          let times = res['products'].map(res => res.time / 100)
          let methods = res['products'].map(res => res.method)



          this.map200 = new Map();
          this.map304 = new Map();
          this.map4__ = new Map();
          this.finalmap = new Map<string, number[]>();
          this.users = res['products'];
          this.users1 = res['products'];
          this.users.forEach((x) => {
            if (this.map200.has(x.api.split("/")[1]) && x.response === 200) {
              this.map200.set(x.api.split("/")[1], this.map200.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response === 200) {
              this.map200.set(x.api.split("/")[1], 1);
            }
          });
          this.users1.forEach((x) => {
            if (this.map304.has(x.api.split("/")[1]) && x.response === 304) {
              this.map304.set(x.api.split("/")[1], this.map304.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response === 304) {
              this.map304.set(x.api.split("/")[1], 1);
            }
          });
          this.users1.forEach((x) => {
            if (this.map4__.has(x.api.split("/")[1]) && x.response != 304 && x.response != 200) {
              this.map4__.set(x.api.split("/")[1], this.map4__.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response != 304 && x.response != 200) {
              this.map4__.set(x.api.split("/")[1], 1);
            }
          });

          this.set.forEach((x) => {
            this.finalmap.set(x, [this.map200.has(x) ? this.map200.get(x) : 0, this.map304.has(x) ? this.map304.get(x) : 0, this.map4__.has(x) ? this.map4__.get(x) : 0]);
          })

          let keys2: any = [];
          this.finalmap.forEach((value: number[], key: string) => {
            keys2.push(key);
          })
          this.finalmap.forEach((value: number[], key: string) => {

            this.values22.push(value[0]);
            this.values33.push(value[1]);
            this.values44.push(value[2]);
          });

          this.values22.push(0);
          this.values33.push(0);
          this.values44.push(0);
          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels: keys2,
              datasets: [
                {
                  label: 'no. of success responses',
                  data: this.values22,
                  backgroundColor: [
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                  ],
                  borderColor: [
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',

                  ],
                  // fill: false
                },

                {
                  label: 'no. of error responses',
                  data: this.values44,
                  backgroundColor: [
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                  ],
                  borderColor: [
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                  ],
                  // fill: false
                },
              ]
            },
          })
          let keys1 = Array.from(this.countmap1.keys());
          let values1 = Array.from(this.countmap1.values());

          this.chart2 = new Chart('canvas2', {
            type: 'line',
            data: {
              labels: this.modulos,
              datasets: [
                {
                  label: 'time of module in seconds',
                  data: this.timetable,
                  borderColor: '#DA680E',

                  fill: true
                },
              ]
            },

          })


          this.chart5 = new Chart('canvas5', {
            type: 'line',
            data: {
              labels: this.modulos,
              datasets: [

                {
                  label: 'response code of module',
                  data: this.responsetable,
                  borderColor: '#008080',
                  //  backgroundColor:'green'
                  fill: true,

                },
              ]
            },

          })


          let keys = Array.from(this.countmap.keys());
          let values = Array.from(this.countmap.values());
          this.chart4 = new Chart('canvas4', {
            type: 'pie',
            data: {
              labels: keys,
              datasets: [
                {
                  label: 'number of calls for a module',
                  data: values,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#4BBF91',
                    'orange',
                    'purple',
                    '#F25278',
                    '#61B33B',
                    'red',
                    'brown',
                    'blue',
                    'grey',
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

        else if (this.region.length > 1 && this.firstdate.indexOf('-') === -1 && this.lastdate.indexOf('-') === -1) {


          console.log(this.firstdate + "toooooooooooooo" + this.lastdate + " and region " + this.region);

          res['products'].forEach((x) => {
            if (x.region === this.region) {
              var table1modelData: table1model = {
                api: x.api,
                module: x.api.split("/")[1],
                method: x.method,
                response: x.response,
                time: x.time,
                region: x.region,
              };
              this.table1.push(table1modelData);
            }
          })
          this.dataSource = new MatTableDataSource(this.table1);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;
          //let timeoutarray=[];
          this.iter = res['products'];

          this.countmap = new Map();
          res['products'].forEach((x) => {
            if (x.region === this.region) {
              this.modulos.push(x.api.split("/")[1]);
            }
          })

          this.set = new Set();
          res['products'].forEach((x) => {
            if (x.region === this.region) {
              this.set.add(x.api.split("/")[1]);
            }
          })




          this.p = new Map();
          res['products'].forEach((x) => {
            if (!this.p.has(x.api.split('/')[1]) && x.region === this.region) {
              this.p.set((x.api.split('/')[1]), new Map());
              this.p.get(x.api.split('/')[1]).set(x.region, 1);

            }
            else if (this.p.has(x.api.split('/')[1]) && !(this.p.get(x.api.split('/')[1]).has(x.region)) && x.region === this.region) {
              this.p.get(x.api.split('/')[1]).set(x.region, 1);

            }
            else if (this.p.has(x.api.split('/')[1]) && this.p.get(x.api.split('/')[1]).has(x.region) && x.region === this.region) {
              this.p.get(x.api.split('/')[1]).set(x.region, this.p.get(x.api.split('/')[1]).get(x.region) + 1);

            }

          })

          this.p.forEach((value: any, key: string) => {
            this.max = 0;
            this.maxregion = '';
            value.forEach((value: number, key: string) => {
              if (value > this.max) {
                this.max = value;
                this.maxregion = key;
              }
            })
            this.mapofregion.push(this.maxregion);

          })


          this.q = new Map();
          res['products'].forEach((x) => {
            if (!this.q.has(x.api.split('/')[1]) && x.region === this.region) {
              this.q.set((x.api.split('/')[1]), new Map());
              this.q.get(x.api.split('/')[1]).set(x.api, 1);

            }
            else if (this.q.has(x.api.split('/')[1]) && !(this.q.get(x.api.split('/')[1]).has(x.api)) && x.region === this.region) {
              this.q.get(x.api.split('/')[1]).set(x.api, 1);

            }
            else if (this.q.has(x.api.split('/')[1]) && this.q.get(x.api.split('/')[1]).has(x.api) && x.region === this.region) {
              this.q.get(x.api.split('/')[1]).set(x.api, this.q.get(x.api.split('/')[1]).get(x.api) + 1);

            }

          })

          this.q.forEach((value: any, key: string) => {
            this.max1 = 0;
            this.maxregion1 = '';
            value.forEach((value: number, key: string) => {
              if (value > this.max1) {
                this.max1 = value;
                this.maxregion1 = key;
              }
            })
            this.mapofregion1.push(this.maxregion1);

          })

          let mn = 0;
          this.set.forEach((x) => {
            var modelData9: extra = {
              module: x,
              region: this.mapofregion[mn],
              api: this.mapofregion1[mn]
            };
            mn = mn + 1;
            this.regioncount.push(modelData9);
          })


          this.dataSource9 = new MatTableDataSource(this.regioncount);
          this.dataSource9.paginator = this.paginator9;


          res['products'].forEach((x) => {
            if (this.countmap.has(x.api.split("/")[1]) && (x.region === this.region)) {
              this.countmap.set(x.api.split("/")[1], this.countmap.get(x.api.split("/")[1]) + 1)
            }
            else if (x.region === this.region) {
              this.countmap.set(x.api.split("/")[1], 1);
            }
          })

          this.countmap.forEach((value: number, key: string) => {
            var modelData5: model1 = {
              module: key,
              count: value
            };
            this.modulecount.push(modelData5);
          })

          this.dataSource5 = new MatTableDataSource(this.modulecount);
          this.dataSource5.paginator = this.paginator5;


          this.timemap = new Map();
          this.variable = res['products'];
          this.variable.forEach((x) => {
            if (this.timemap.has(x.api.split("/")[1]) && (x.region === this.region)) {
              this.timemap.set(x.api.split("/")[1], this.timemap.get(x.api.split("/")[1]) + x.time);
            }
            else if (x.region === this.region) {
              this.timemap.set(x.api.split("/")[1], x.time);
            }
          })

          this.timemap.forEach((value: number, key: string) => {
            var modelData2: model = {
              module: key,
              count: this.countmap.has(key) ? this.countmap.get(key) : 0,
              time: Math.round(value / (this.countmap.has(key) ? this.countmap.get(key) : 0)),

            };
            this.modulearray.push(modelData2);
          });
          this.dataSource6 = new MatTableDataSource(this.modulearray);
          this.dataSource6.paginator = this.paginator6;

          let apis = res['products'].map(res => res.api)
          this.countmap1 = new Map();
          res['products'].forEach((x) => {
            if (this.countmap1.has(x.api) && (x.region === this.region)) {
              this.countmap1.set(x.api, this.countmap1.get(x.api) + 1);
            }
            else if (x.region === this.region) {
              this.countmap1.set(x.api, 1);
            }
          })
          res['products'].forEach((x) => {
            if (x.region === this.region) {
              this.responsetable.push(x.response);
            }
          })
          this.responsemap = new Map();

          res['products'].forEach((x) => {
            if (this.responsemap.has(x.response) && (x.region === this.region)) {
              this.responsemap.set(x.response, this.responsemap.get(x.response) + 1);
            }
            else if (x.region === this.region) {
              this.responsemap.set(x.response, 1);
            }
          })

          this.forbidnum = this.responsemap.has(404) ? this.responsemap.get(404) : 0;
          this.oknum = this.responsemap.has(200) ? this.responsemap.get(200) : 0;
          this.notmodifiednum = this.responsemap.has(304) ? this.responsemap.get(304) : 0;
          res['products'].forEach((x) => {
            if (x.region === this.region) {
              this.timetable.push(x.time / 1000);
            }
          })
          let methods = res['products'].map(res => res.method)

          this.map200 = new Map();
          this.map304 = new Map();
          this.finalmap = new Map<string, number[]>();
          this.map4__ = new Map();
          this.users = res['products'];
          this.users1 = res['products'];
          this.users.forEach((x) => {
            if (this.map200.has(x.api.split("/")[1]) && x.response === 200 && (x.region === this.region)) {
              this.map200.set(x.api.split("/")[1], this.map200.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response === 200 && (x.region === this.region)) {
              this.map200.set(x.api.split("/")[1], 1);
            }
          });

          this.users1.forEach((x) => {
            if (this.map304.has(x.api.split("/")[1]) && x.response === 304 && (x.region === this.region)) {
              this.map304.set(x.api.split("/")[1], this.map304.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response === 304 && (x.region === this.region)) {
              this.map304.set(x.api.split("/")[1], 1);
            }
          });
          this.users1.forEach((x) => {
            if (this.map4__.has(x.api.split("/")[1]) && x.response != 304 && x.response != 200 && (x.region === this.region)) {
              this.map4__.set(x.api.split("/")[1], this.map4__.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response != 304 && x.response != 200 && (x.region === this.region)) {
              this.map4__.set(x.api.split("/")[1], 1);
            }
          });




          this.set.forEach((x) => {
            this.finalmap.set(x, [this.map200.has(x) ? this.map200.get(x) : 0, this.map304.has(x) ? this.map304.get(x) : 0, this.map4__.has(x) ? this.map4__.get(x) : 0]);
          })

          let keys2: any = [];
          this.finalmap.forEach((value: number[], key: string) => {
            keys2.push(key);
          })
          this.finalmap.forEach((value: number[], key: string) => {

            this.values22.push(value[0]);
            this.values33.push(value[1]);
            this.values44.push(value[2]);
          });


          this.values22.push(0);
          this.values33.push(0);
          this.values44.push(0);
          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels: keys2,
              datasets: [
                {
                  label: 'no. of success responses',
                  data: this.values22,
                  backgroundColor: [
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                  ],
                  borderColor: [
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                  ],
                  // fill: false
                },

                {
                  label: 'no. of error responses',
                  data: this.values44,
                  backgroundColor: [
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                  ],
                  borderColor: [
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                  ],
                  // fill: false
                },
              ]
            },
          })
          let keys1 = Array.from(this.countmap1.keys());
          let values1 = Array.from(this.countmap1.values());



          this.chart2 = new Chart('canvas2', {
            type: 'line',
            data: {
              labels: this.modulos,
              datasets: [
                {
                  label: 'time of module in seconds',
                  data: this.timetable,
                  borderColor: '#DA680E',
                  //  backgroundColor:'orange'

                  fill: true
                },
              ]
            },

          })


          this.chart5 = new Chart('canvas5', {
            type: 'line',
            data: {
              labels: this.modulos,
              datasets: [

                {
                  label: 'response code of module',
                  data: this.responsetable,
                  borderColor: '#008080',
                  //  backgroundColor:'green'
                  fill: true,

                },
              ]
            },

          })






          let keys = Array.from(this.countmap.keys());
          let values = Array.from(this.countmap.values());
          //  values.push(0);
          this.chart4 = new Chart('canvas4', {
            type: 'pie',
            data: {
              labels: keys,
              datasets: [
                {
                  label: 'number of calls for a module',
                  data: values,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#4BBF91',
                    'orange',
                    'purple',
                    '#F25278',
                    '#61B33B',
                    'red',
                    'brown',
                    'blue',
                    'grey',
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

        else if (this.region.length > 1 && this.firstdate.indexOf('-') != -1 && this.lastdate.indexOf('-') != -1) {


          console.log(this.firstdate + "toooooooooooooo" + this.lastdate + " and region " + this.region);

          res['products'].forEach((x) => {
            if (x.region === this.region && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              var table1modelData: table1model = {
                api: x.api,
                module: x.api.split("/")[1],
                method: x.method,
                response: x.response,
                time: x.time,
                region: x.region,
              };
              this.table1.push(table1modelData);
            }
          })
          this.dataSource = new MatTableDataSource(this.table1);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;
          this.iter = res['products'];

          this.countmap = new Map();
          res['products'].forEach((x) => {
            if (x.region === this.region && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.modulos.push(x.api.split("/")[1]);
            }
          })

          this.set = new Set();
          res['products'].forEach((x) => {
            if (x.region === this.region && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.set.add(x.api.split("/")[1]);
            }
          })

          this.p = new Map();
          res['products'].forEach((x) => {
            if (!this.p.has(x.api.split('/')[1]) && (x.date >= this.firstdate && x.date <= this.lastdate) && x.region === this.region) {
              this.p.set((x.api.split('/')[1]), new Map());
              this.p.get(x.api.split('/')[1]).set(x.region, 1);

            }
            else if (this.p.has(x.api.split('/')[1]) && !(this.p.get(x.api.split('/')[1]).has(x.region)) && (x.date >= this.firstdate && x.date <= this.lastdate) && x.region === this.region) {
              this.p.get(x.api.split('/')[1]).set(x.region, 1);

            }
            else if (this.p.has(x.api.split('/')[1]) && this.p.get(x.api.split('/')[1]).has(x.region) && (x.date >= this.firstdate && x.date <= this.lastdate) && x.region === this.region) {
              this.p.get(x.api.split('/')[1]).set(x.region, this.p.get(x.api.split('/')[1]).get(x.region) + 1);

            }

          })

          this.p.forEach((value: any, key: string) => {
            this.max = 0;
            this.maxregion = '';
            value.forEach((value: number, key: string) => {
              if (value > this.max) {
                this.max = value;
                this.maxregion = key;
              }
            })
            this.mapofregion.push(this.maxregion);

          })

          this.q = new Map();
          res['products'].forEach((x) => {
            if (!this.q.has(x.api.split('/')[1]) && (x.date >= this.firstdate && x.date <= this.lastdate) && x.region === this.region) {
              this.q.set((x.api.split('/')[1]), new Map());
              this.q.get(x.api.split('/')[1]).set(x.api, 1);

            }
            else if (this.q.has(x.api.split('/')[1]) && !(this.q.get(x.api.split('/')[1]).has(x.api)) && (x.date >= this.firstdate && x.date <= this.lastdate) && x.region === this.region) {
              this.q.get(x.api.split('/')[1]).set(x.api, 1);

            }
            else if (this.q.has(x.api.split('/')[1]) && this.q.get(x.api.split('/')[1]).has(x.api) && (x.date >= this.firstdate && x.date <= this.lastdate) && x.region === this.region) {
              this.q.get(x.api.split('/')[1]).set(x.api, this.q.get(x.api.split('/')[1]).get(x.api) + 1);

            }

          })

          this.q.forEach((value: any, key: string) => {
            this.max1 = 0;
            this.maxregion1 = '';
            value.forEach((value: number, key: string) => {
              if (value > this.max1) {
                this.max1 = value;
                this.maxregion1 = key;
              }
            })
            this.mapofregion1.push(this.maxregion1);

          })

          let mn = 0;
          this.set.forEach((x) => {
            var modelData9: extra = {
              module: x,
              region: this.mapofregion[mn],
              api: this.mapofregion1[mn]
            };
            mn = mn + 1;
            this.regioncount.push(modelData9);
          })


          this.dataSource9 = new MatTableDataSource(this.regioncount);
          this.dataSource9.paginator = this.paginator9;

          res['products'].forEach((x) => {
            if (this.countmap.has(x.api.split("/")[1]) && (x.region === this.region && (x.date >= this.firstdate && x.date <= this.lastdate))) {
              this.countmap.set(x.api.split("/")[1], this.countmap.get(x.api.split("/")[1]) + 1)
            }
            else if (x.region === this.region && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.countmap.set(x.api.split("/")[1], 1);
            }
          })

          this.countmap.forEach((value: number, key: string) => {
            var modelData5: model1 = {
              module: key,
              count: value
            };
            this.modulecount.push(modelData5);
          })

          this.dataSource5 = new MatTableDataSource(this.modulecount);
          this.dataSource5.paginator = this.paginator5;


          this.timemap = new Map();
          this.variable = res['products'];
          this.variable.forEach((x) => {
            if (this.timemap.has(x.api.split("/")[1]) && (x.region === this.region) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.timemap.set(x.api.split("/")[1], this.timemap.get(x.api.split("/")[1]) + x.time);
            }
            else if (x.region === this.region && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.timemap.set(x.api.split("/")[1], x.time);
            }
          })

          this.timemap.forEach((value: number, key: string) => {
            var modelData2: model = {
              module: key,
              count: this.countmap.has(key) ? this.countmap.get(key) : 0,
              time: Math.round(value / (this.countmap.has(key) ? this.countmap.get(key) : 0)),

            };
            this.modulearray.push(modelData2);
          });
          this.dataSource6 = new MatTableDataSource(this.modulearray);
          this.dataSource6.paginator = this.paginator6;


          let apis = res['products'].map(res => res.api)
          this.countmap1 = new Map();
          res['products'].forEach((x) => {
            if (this.countmap1.has(x.api) && (x.region === this.region) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.countmap1.set(x.api, this.countmap1.get(x.api) + 1);
            }
            else if (x.region === this.region && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.countmap1.set(x.api, 1);
            }
          })

          res['products'].forEach((x) => {
            if (x.region === this.region && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.responsetable.push(x.response);
            }
          })
          this.responsemap = new Map();

          res['products'].forEach((x) => {
            if (this.responsemap.has(x.response) && (x.region === this.region) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.responsemap.set(x.response, this.responsemap.get(x.response) + 1);
            }
            else if (x.region === this.region && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.responsemap.set(x.response, 1);
            }
          })

          this.forbidnum = this.responsemap.has(404) ? this.responsemap.get(404) : 0;
          this.oknum = this.responsemap.has(200) ? this.responsemap.get(200) : 0;
          this.notmodifiednum = this.responsemap.has(304) ? this.responsemap.get(304) : 0;

          res['products'].forEach((x) => {
            if (x.region === this.region && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.timetable.push(x.time / 1000);
            }
          })
          let methods = res['products'].map(res => res.method)


          this.map200 = new Map();
          this.map304 = new Map();
          this.finalmap = new Map<string, number[]>();
          this.map4__ = new Map();
          this.users = res['products'];
          this.users1 = res['products'];
          this.users.forEach((x) => {
            if (this.map200.has(x.api.split("/")[1]) && x.response === 200 && (x.region === this.region) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map200.set(x.api.split("/")[1], this.map200.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response === 200 && (x.region === this.region) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map200.set(x.api.split("/")[1], 1);
            }
          });

          this.users1.forEach((x) => {
            if (this.map304.has(x.api.split("/")[1]) && x.response === 304 && (x.region === this.region) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map304.set(x.api.split("/")[1], this.map304.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response === 304 && (x.region === this.region) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map304.set(x.api.split("/")[1], 1);
            }
          });
          this.users1.forEach((x) => {
            if (this.map4__.has(x.api.split("/")[1]) && x.response != 304 && x.response != 200 && (x.region === this.region) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map4__.set(x.api.split("/")[1], this.map4__.get(x.api.split("/")[1]) + 1);
            }
            else if (x.response != 304 && x.response != 200 && (x.region === this.region) && (x.date >= this.firstdate && x.date <= this.lastdate)) {
              this.map4__.set(x.api.split("/")[1], 1);
            }
          });




          this.set.forEach((x) => {
            this.finalmap.set(x, [this.map200.has(x) ? this.map200.get(x) : 0, this.map304.has(x) ? this.map304.get(x) : 0, this.map4__.has(x) ? this.map4__.get(x) : 0]);
          })

          let keys2: any = [];
          this.finalmap.forEach((value: number[], key: string) => {
            keys2.push(key);
          })
          this.finalmap.forEach((value: number[], key: string) => {

            this.values22.push(value[0]);
            this.values33.push(value[1]);
            this.values44.push(value[2]);
          });


          this.values22.push(0);
          this.values33.push(0);
          this.values44.push(0);
          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels: keys2,
              datasets: [
                {
                  label: 'no. of success responses',
                  data: this.values22,
                  backgroundColor: [
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                  ],
                  borderColor: [
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                    '#008080',
                  ],
                  // fill: false
                },

                {
                  label: 'no. of error responses',
                  data: this.values44,
                  backgroundColor: [
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                  ],
                  borderColor: [
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                    '#DA680E',
                  ],
                  // fill: false
                },
              ]
            },
          })
          let keys1 = Array.from(this.countmap1.keys());
          let values1 = Array.from(this.countmap1.values());

          this.chart2 = new Chart('canvas2', {
            type: 'line',
            data: {
              labels: this.modulos,
              datasets: [
                {
                  label: 'time of module in seconds',
                  data: this.timetable,
                  borderColor: '#DA680E',
                  //  backgroundColor:'orange'

                  fill: true
                },
              ]
            },

          })


          this.chart5 = new Chart('canvas5', {
            type: 'line',
            data: {
              labels: this.modulos,
              datasets: [

                {
                  label: 'response code of module',
                  data: this.responsetable,
                  borderColor: '#008080',
                  //  backgroundColor:'green'
                  fill: true,

                },
              ]
            },

          })







          let keys = Array.from(this.countmap.keys());
          let values = Array.from(this.countmap.values());
          //  values.push(0);
          this.chart4 = new Chart('canvas4', {
            type: 'pie',
            data: {
              labels: keys,
              datasets: [
                {
                  label: 'number of calls for a module',
                  data: values,
                  backgroundColor: [
                    '#008080',
                    '#DA680E',
                    'LightSkyBlue',
                    '#4BBF91',
                    'orange',
                    'purple',
                    '#F25278',
                    '#61B33B',
                    'red',
                    'brown',
                    'blue',
                    'grey',
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

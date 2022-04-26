import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './weather.service';
import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, MatOption } from '@angular/material/core';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput: MatInput;

  @ViewChild('toInput', {
    read: MatInput
  }) toInput: MatInput;

  @ViewChild('inputt', {
    read: MatInput
  }) inputt: MatInput;

  @ViewChild('matRef') matRef: MatSelect;
  @ViewChild('matRef2') matRef2: MatSelect;
  users: any;
  modulos: any;
  set: any;
  important = '';
  st: string = '';
  show = false;
  single = '';
  num = 0;
  q = 0;
  en: string = '';
  display = false;
  startdate = '';
  previous = '';
  today: Date = new Date();
  currentYear: number = this.today.getFullYear();
  currentMonth: number = this.today.getMonth();
  currentDay: number = this.today.getDate();
  minDate: Object;
  maxDate: Object = new Date();
  minDate1: Object;
  maxDate1: Object;
  endate = '';
  module = '';
  monthmap1: any;
  region: any = [];
  count = 0;
  prev = '';
  daterange = '';
  boool = false;
  regi = '';
  item: any = [];
  monthmap: any;
  moduleForm: FormGroup;
  regionForm: FormGroup;
  range = new FormGroup({
    start: new FormControl(Validators.required),
    end: new FormControl(Validators.required),
  });
  singlerange = new FormGroup({
    start1: new FormControl(Validators.required),
  });
  matcher = new MyErrorStateMatcher();

  constructor(private _weather: WeatherService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe((res) => {

        this.monthmap1 = new Map();
        this.monthmap1.set(0, 'Jan');
        this.monthmap1.set(1, 'Feb');
        this.monthmap1.set(2, 'Mar');
        this.monthmap1.set(3, 'Apr');
        this.monthmap1.set(4, 'May');
        this.monthmap1.set(5, 'Jun');
        this.monthmap1.set(6, 'Jul');
        this.monthmap1.set(7, 'Aug');
        this.monthmap1.set(8, 'Sep');
        this.monthmap1.set(9, 'Oct');
        this.monthmap1.set(10, 'Nov');
        this.monthmap1.set(11, 'Dec');

        let year = new Date().getFullYear();
        let month = +(new Date().getMonth());
        let date = +(new Date().getDate());
        if (month === 0) {
          this.minDate1 = new Date(year, month, 1);
        }
        else {
          this.minDate1 = new Date(year, month - 1, date);
        }
        this.maxDate1 = new Date();
        this.users = res['products'];
        this.modulos = res['products'].map(res => res.api.split("/")[1]);
        this.set = new Set();
        if (month === 0) {
          for (var i = 1; i <= date; i++) {
            if (i < 10) {
              this.item.push(this.monthmap1.get(month) + " " + "0" + i + " " + year);
            }
            else {
              this.item.push(this.monthmap1.get(month) + " " + i + " " + year);
            }
          }
        }
        else {
          for (var i = 0; i <= 31; i++) {
            if (date < 10) {
              this.item.push(this.monthmap1.get(month - 1) + " " + "0" + date + " " + year);
            }
            else {
              this.item.push(this.monthmap1.get(month - 1) + " " + date + " " + year);
            }
            date++;
            if (date === 32) {
              date = 1;
              month++;
            }
          }
        }
        console.log(this.item);

        this.region.push('us-east-2');
        this.region.push('us-east-1');
        this.region.push('us-west-1');
        this.region.push('us-west-2');
        this.region.push('af-south-1');
        this.region.push('ap-east-1');
        this.region.push('ap-southeast-3');
        this.region.push('ap-southeast-2');
        this.region.push('ap-south-1');
        this.region.push('ap-northeast-3');
        this.region.push('ap-northeast-2');
        this.region.push('ap-southeast-1');
        this.region.push('ap-northeast-1');
        this.region.push('eu-central-1');
        this.region.push('eu-west-1');
        this.region.push('eu-west-2');
        this.region.push('eu-south-1');
        this.region.push('eu-west-3');
        this.region.push('eu-north-1');
        this.region.push('cn-north-1');
        this.region.push('sa-east-1');
        this.region.push('cn-northwest-1');
        this.region.push('ca-central-1');


        this.modulos.forEach((x) => {
          this.set.add(x);
        })
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
      })
    this.moduleForm = new FormGroup({
      'module': new FormControl(null, Validators.required),
    });
    this.regionForm = new FormGroup({
      'reeg': new FormControl(null, Validators.required),
    });

  }
  onFormSubmit() {
    if (this.moduleForm.valid) {
      this.important = this.moduleForm.get('module')?.value;
      console.log(this.important);
      this.en = '';
      this.st = '';
      this.daterange = '';
      this.startdate = '';
      this.prev = '';
      this.count = 0;
      this.endate = '';
      this.regi = '';//to reset filter when moving to a new metric
      this.fromInput.value = '';

      this.toInput.value = '';
      this.inputt.value = '';
      this.single = '';
      this.matRef.options.forEach((data: MatOption) => data.deselect());
    } else {
      console.log("error");
    }
  }
  gotoday() {
    this.display = true;
  }
  back() {
    this.display = false;
  }
  onFormSubmit1() {
    if (this.range.valid) {
      this.boool = true;
      this.count = this.count + 1;
      this.st = this.range.get('start')?.value + '';
      this.en = this.range.get('end')?.value + '';
      let starray = this.st.split(' ');
      let enarray = this.en.split(' ');
      this.startdate = starray[3] + "-" + this.monthmap.get(starray[1]) + "-" + starray[2];
      this.endate = enarray[3] + "-" + this.monthmap.get(enarray[1]) + "-" + enarray[2];
      if (this.count % 2 != 1) {
        this.prev = this.en;
      }
      console.log('prev - ' + this.prev + ' ' + 'start - ' + this.startdate + ' ' + 'end - ' + this.endate + ' ' + this.count);

      this.daterange = this.startdate + '$' + this.endate;

    } else {
      console.log("error");
    }
  }
  onFormSubmit4() {

    if (this.singlerange.valid) {
      this.fromInput.value = '';

      this.toInput.value = '';
      this.matRef.options.forEach((data: MatOption) => data.deselect());
      this.matRef2.options.forEach((data: MatOption) => data.deselect());

      this.num = this.num + 1;

      this.single = (this.singlerange.get('start1')?.value + '').substring(4, 15);
      console.log(this.single);

    }
    else {
      console.log("error");
    }
  }



  onFormSubmit2() {
    if (this.regionForm.valid) {
      this.regi = this.regionForm.get('reeg')?.value;
      console.log(this.regi);
    } else {
      console.log("error");
    }
  }
  shownav() {
    this.q = this.q + 1;
    if (this.q % 2 == 1) {
      this.show = true;
    }
    else {
      this.show = false;
    }
  }
  openNav() {
    document.getElementById("myNav").style.width = "30%";
  }

  closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }


  filterData($event: any) {
    this.set.filter = $event.target.value;
  }
  parentfunction(data) {
    if (data) {
      this.boool = false;
    }
    console.log(data);
  }

}



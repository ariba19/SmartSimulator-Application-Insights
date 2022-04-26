import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';


interface model {
  "id": number;
  "method": string;
  "api": string;
  "response": number;
  "time": number;
  "date": string;
  "region": string;
}


@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  inter = '';
  datee = '';
  monthmap: any;
  extra = '';
  finaldate = '';
  postarray: any = [];
  finalarray: any = [];

  constructor(private http: HttpClient) {
    setInterval(() => { this.reset() }, 3000 * 60);
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

  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const startTime = Date.now();

    let status: number;

    return next.handle(req).pipe(
      tap(
        event => {
          status = 0;
          if (event instanceof HttpResponse) {
            status = 200;
          }
        },
        error => status = 403
      ),
      finalize(() => {
        const elapsedTime = Date.now() - startTime;
        const message = req.method + " " + req.url.substring(8).split('.')[3].substring(2).split('?')[0] + " " + req.url.substring(8).split('/')[1].split('?')[0] + " " + req.url.substring(8).split('.')[0].substring(4) + " " + status + " " + elapsedTime;

        this.logDetails(message);
      })
    );
  }
  private logDetails(msg: string) {
    if (msg.split(' ')[1].indexOf('endpoint=login') == -1 && msg.split(' ')[1].indexOf('onfig') == -1 && msg.split(' ')[1].indexOf('getbannermessage') == -1) {
      this.datee = new Date().toString().substring(4, 15);
      this.finaldate = this.datee.split(' ')[2] + '-' + this.monthmap.get(this.datee.split(' ')[0]) +
        '-' + this.datee.split(' ')[1];
      console.log(msg + " " + this.finaldate + "      " + Date.now() + Math.random());

      this.extra = msg.split(' ')[0] + " " + msg.split(' ')[1] + " " + msg.split(' ')[2] + " " +
        msg.split(' ')[3] + " " + msg.split(' ')[4];
      if (this.inter.includes(this.extra) === false) {
        this.inter = this.inter + (msg + " " + this.finaldate + ",");
      }
    }

  }
  public reset() {
    console.log(this.inter);
    console.log(this.inter.length);
    this.postarray = this.inter.split(',');
    this.postarray.forEach((x) => {
      let temp = x.split(' ');
      if (temp[0] != '' && temp[1] != 'azonaws') {
        var modelData1: model = {
          "id": Date.now() + Math.random(),
          "method": temp[0],
          "api": temp[1],
          "time": +temp[5],
          "response": +temp[4],
          "date": temp[6],
          "region": temp[3],
        };
        this.finalarray.push(modelData1);
      }
    })
    console.log(this.finalarray);
    this.http.post("https://woenx35ae8.execute-api.ap-south-1.amazonaws.com/prod/metrics",
      this.finalarray)
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });

    //send post request of final array here

    this.inter = '';
  }

} 
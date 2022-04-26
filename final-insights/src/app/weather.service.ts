import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {map} from 'rxjs/operators';


@Injectable()

export class WeatherService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get("https://woenx35ae8.execute-api.ap-south-1.amazonaws.com/prod/metrics")
    .pipe(map(result => result)); 
  }

  

}

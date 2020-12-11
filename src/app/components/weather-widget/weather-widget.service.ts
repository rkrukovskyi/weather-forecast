import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherWidgetService {

  constructor(private http: HttpClient) { }

  getCityTemperature(loc: string): Observable<any> {
      return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=d9d9ea280539534cd668c8f7b6969c43`)
  }

}


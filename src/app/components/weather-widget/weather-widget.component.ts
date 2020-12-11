import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherWidgetService } from './weather-widget.service';
import { CityCard } from 'src/app/models/weather-models';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit, OnDestroy {
  cityCards$ =  new BehaviorSubject<CityCard[]>(null);
  private destroy$ = new Subject();

  constructor(private weatherWidgetService: WeatherWidgetService) { }

  ngOnInit(): void {
    this.weatherWidgetService.getCityTemperature('London').pipe(takeUntil(this.destroy$)).subscribe(
      (i) => {
        this.cityCards$.next([{
          name: 'London',
          temperature: i.main.temp,
        }])
      }
    )
  }

  getWeather(location: string) {
    this.weatherWidgetService.getCityTemperature(location).pipe(takeUntil(this.destroy$)).subscribe(
      (i) => {
        this.addData({
            name: i.name,
            temperature: i.main.temp}
        )}
    );
  }

  addData(dataObj: CityCard) {
    const currentValue = this.cityCards$.value;
    const updatedValue = [...currentValue, dataObj];
    this.cityCards$.next(updatedValue);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

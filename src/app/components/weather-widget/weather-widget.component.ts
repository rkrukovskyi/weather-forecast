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
  defaultCity = 'London';

  constructor(private weatherWidgetService: WeatherWidgetService) { }

  ngOnInit(): void {
    this.weatherWidgetService.getCityTemperature(this.defaultCity).pipe(takeUntil(this.destroy$)).subscribe(
      (i) => {
        this.cityCards$.next([{
          id: 1,
          name: 'London',
          temperature: this.convertTemp(i.main.temp),
        }])
      }
    )
  }

  convertTemp(k: number): number{
    const temp = Number((k - 273.15).toFixed(2));
    return temp
  }

  getWeather(location: string) {
    this.weatherWidgetService.getCityTemperature(location).pipe(takeUntil(this.destroy$)).subscribe(
      (i) => {
        this.addData({
            id: this.cityCards$.value.length + 1,
            name: i.name,
            temperature: this.convertTemp(i.main.temp),
          }
        )
      }
    )
  }

  addData(dataObj: CityCard) {
    const currentValue = this.cityCards$.value;
    const updatedValue = [...currentValue, dataObj];
    this.cityCards$.next(updatedValue);
  }

  deleteCityCard(id: number) {
    const currentValue = this.cityCards$.value.filter(
      i => !(i.id === id)
    );
    const updatedValue = [...currentValue];
    this.cityCards$.next(updatedValue);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

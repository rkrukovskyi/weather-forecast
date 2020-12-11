import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherWidgetService } from './components/weather-widget/weather-widget.service';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { CityCardComponent } from './components/city-card/city-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from "carbon-components-angular/button";
import { InputModule } from "carbon-components-angular/input";

@NgModule({
  declarations: [
    AppComponent,
    WeatherWidgetComponent,
    LocationFormComponent,
    CityCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    InputModule,
  ],
  providers: [WeatherWidgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  cityName: string = '';
  tempdata: any;
  tempType: string = 'celcius';
  someIssue = false;

  constructor(){}

  ngOnInit(): void {  
  }

  async getWeatherData() {

    try {
      const forecastData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=23437e7df8bf4d68b0e24927241707&q=${this.cityName}&days=5`)
      .then((result) => result.json()).then((value) => value)
      if (!forecastData.error) {
        this.tempdata = forecastData;
        console.log(this.tempdata);
      }
      else {
        this.someIssue = true;
      }
    }
    catch {
      console.log(new Error ('Something went wrong'));
    }
  }

  getIcon() {
    return this.tempdata.current.condition.icon;
  }

  getForecastIcon(forecast: any) {
    return forecast.day.condition.icon;
  }

  tempTypeValueChange(event: any) {
    if (event.target.value === 'celcius') {
      this.tempType = 'celcius';
    }
    else {
      this.tempType = 'fahrenheit';
    }
  }

  getTempUnit() {
    if (this.tempType === 'celcius')
      return 'C'
    else 
      return 'F'
  }

}

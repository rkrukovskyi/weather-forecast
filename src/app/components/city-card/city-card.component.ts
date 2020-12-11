import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CityCard } from 'src/app/models/weather-models';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnInit {
  @Input() card: CityCard;
  @Output() delete =  new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  onCardDelete(id: number) {
    this.delete.emit(id);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  formGroup: FormGroup;
  @Output() submit =  new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required]
    });
  }
  get nameControl(): AbstractControl {
    return this.formGroup.get('name');
  }

  ngOnInit(): void {
  }

  onGetCityWeather(): void {
    this.submit.emit(this.nameControl.value);
    this.nameControl.setValue('');
  }

}


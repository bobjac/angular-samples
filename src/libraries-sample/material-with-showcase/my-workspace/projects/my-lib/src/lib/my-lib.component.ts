import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'lib-my-lib',
  templateUrl: './my-lib.component.html',
  styleUrls: ['./my-lib.component.scss']
})
export class MyLibComponent implements OnInit {

  currentDate: moment.Moment = moment();
  startDate:moment.Moment
  secondDate:moment.Moment
  thirdDate:moment.Moment
  fourthDate:moment.Moment
  fifthDate:moment.Moment
  sixthDate:moment.Moment
  lastDate:moment.Moment

  constructor() {
    this.startDate = this.currentDate.startOf('week');
    this.secondDate = this.startDate.clone().add(1, 'days');
    this.thirdDate = this.startDate.clone().add(2, 'days');
    this.fourthDate = this.startDate.clone().add(3, 'days');
    this.fifthDate = this.startDate.clone().add(4, 'days');
    this.sixthDate = this.startDate.clone().add(5, 'days');
    this.lastDate = this.startDate.clone().add(6, 'days');
  }

  ngOnInit(): void {
    this.getDays(this.currentDate);
  }

  previousWeek() {
    this.currentDate.subtract(1,'weeks');
    this.getDays(this.currentDate);
  }

  nextWeek() {
    this.currentDate.add(1,'weeks');
    this.getDays(this.currentDate);
  }

  currentWeek() {
    this.currentDate = moment();
    this.getDays(this.currentDate);
  }
  public getDays(current:moment.Moment) {
    this.startDate = current.startOf('week');
    this.secondDate = current.clone().add(1, 'days');
    this.thirdDate = current.clone().add(2, 'days');
    this.fourthDate = current.clone().add(3, 'days');
    this.fifthDate = current.clone().add(4, 'days');
    this.sixthDate = current.clone().add(5, 'days');
    this.lastDate = current.clone().add(6, 'days');
  }

}

import { DatePipe } from '@angular/common';
import { HttpService } from './../../relax/services/http/http.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewChecked {

  _month;
  _monthString;

  result;

  constructor(
    private http  : HttpService,
    private format: DatePipe
  ) { }

  ngOnInit() {
    this._month = new Date();
  }
  private monthValue: string;
  ngAfterViewChecked() {
    let nowVal = this._month;
    if (nowVal != this.monthValue){
      this._month = nowVal;
      this.monthValue = nowVal;
      this.request();
    }
  }

  request(): void {
    this.http.post('/homePage/showHomePage', { paramJson: JSON.stringify({ month: this.format.transform(this._month, 'yyyy-MM') }) }).then(res => {
      if (res.code == 1000) {
        this.result = res.result;
        this._monthString = Number(this.format.transform(this._month, 'yyyy-MM').split('-')[1]);
      }
    })
  }

  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }



}

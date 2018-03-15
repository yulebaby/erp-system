import { DatePipe } from '@angular/common';
import { HttpService } from './../../relax/services/http/http.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewChecked {

  _month: Date;

  result

  constructor(
    private http  : HttpService,
    private format: DatePipe
  ) { }

  ngOnInit() {
    this.request();
  }
  private monthValue: string;
  ngAfterViewChecked() {
    let nowVal = this.format.transform(this._month, 'yyyy-MM');
    if (nowVal != this.monthValue){
      this.monthValue = nowVal;
      this.request();
    }
  }

  request(): void {
    this.http.post('/homePage/showHomePage').then(res => {
      if (res.code == 1000) {
        this.result = res.result;
      }
    })
  }



}

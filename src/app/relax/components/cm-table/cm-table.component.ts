import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from './../../services/http/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cm-table',
  templateUrl: './cm-table.component.html',
  styleUrls: ['./cm-table.component.scss']
})
export class CmTableComponent implements OnInit {

  @Input() table   : any[] = [];

  dataSet          : object[] = [];

  _pageInfo        : PageInfo = new PageInfo();

  constructor(
    private http    : HttpService,
    private message : NzMessageService
  ) { }

  ngOnInit() {

    console.log(this.table)

    this._request();
  }

  _request(isReset?: boolean): void {
    this._pageInfo.loading = true;
    let params = Object.assign({ paramJson: JSON.stringify({}) }, { pageNum: isReset ? 1 : this._pageInfo.pageNum, pageSize: this._pageInfo.pageSize });
    this.http.post('/customer/potentialCustomerList', params).then(res => {
      if (res.code == 1000) {
        this.dataSet = res.result.list;
        this._pageInfo.totalPage = res.result.totalPage;
      } else {
        this.message.warning(res.info);
      }
      this._pageInfo.loading = false;
    });
  }

}


/** 
 * @interface   初始化分页信息
 * @description 2018-02-28
 */
class PageInfo {
  constructor(
    public loading    : boolean = false,
    public totalPage  : number = 0,
    public pageNum    : number = 1,
    public pageSize   : number = 10
  ) { }
}
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from './../../services/http/http.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cm-table',
  templateUrl: './cm-table.component.html',
  styleUrls: ['./cm-table.component.scss']
})
export class CmTableComponent implements OnInit {

  @Input() thead              : any[] = [];

  @Input('url') _url          : string;

  @Input('params') _params    : object = {};

  @Input() checkedItems       : any[];

  @Input() checkKey           : string = 'id';

  @Output() checkedItemsChange: EventEmitter<any[]> = new EventEmitter();

  dataSet       : object[] = [];

  _pageInfo     : PageInfo = new PageInfo();


  /* ---------- 是否为全选及是否选择 ---------- */
  _allChecked   : boolean;
  _indeterminate: boolean;

  constructor(
    private http    : HttpService,
    private message : NzMessageService
  ) { }

  ngOnInit() {
    this._request();
  }

  _request(isReset?: boolean): void {
    if (this._pageInfo.loading) { return; }
    this._pageInfo.loading = true;
    let params = Object.assign({ paramJson: JSON.stringify(this._params) }, { pageNum: isReset ? 1 : this._pageInfo.pageNum, pageSize: this._pageInfo.pageSize });
    this.http.post(this._url, params).then(res => {
      if (res.code == 1000) {
        this.dataSet = res.result.list;
        this._pageInfo.pageNum = res.result.pageNum;
        this._pageInfo.totalPage = res.result.totalPage;

        /* ------------------- 如果存在选择列表则初始数据 ------------------- */
        if (this.checkedItems) {
          this.dataSet.map((res: any) => res.checked = this.checkedItems.indexOf(res[this.checkKey]) > -1);
          this.isChecked();
        }

      } else {
        this.message.warning(res.info);
      }
      this._pageInfo.loading = false;
    });
  }
  request(params): void {
    this._params = params;
    this._request(true);
  }


  /* --------------------- 点击全选 --------------------- */
  _checkAll(value: boolean): void {
    this.dataSet.map( (res: any) => res.checked = value);
    this.isChecked();
  }

  /* --------------------- 点击选择 --------------------- */
  isChecked(): void {
    let allChecked = this.dataSet.every((value: any) => value.checked === true);
    let allUnChecked = this.dataSet.every((value: any) => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._resetCheckedItems();
  }

  _resetCheckedItems(): void {
    this.dataSet.map( (res: any) => {
      if (res.checked) {
        if (this.checkedItems.indexOf(res[this.checkKey]) === -1) {
          this.checkedItems.push(res[this.checkKey]);
        }
      } else {
        if (this.checkedItems.indexOf(res[this.checkKey]) > -1) {
          this.checkedItems.splice(this.checkedItems.indexOf(res[this.checkKey]), 1);
        }
      }
    })
    this.checkedItemsChange.emit(this.checkedItems);
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
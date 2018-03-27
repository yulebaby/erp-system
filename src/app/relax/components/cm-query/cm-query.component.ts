import { CacheService } from './../../services/cache/cache.service';
import { HttpService } from './../../../relax/services/http/http.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cm-query',
  templateUrl: './cm-query.component.html',
  styleUrls: ['./cm-query.component.scss']
})
export class CmQueryComponent implements OnInit {

  @Input('node') _node  : object[] = [];

  @Input() isCollapse   : boolean = true

  @Output() onSubmit    : EventEmitter<object> = new EventEmitter();

  _queryForm            : FormGroup;

  _showSlideBtn         : boolean;



  constructor(
    private fb      : FormBuilder = new FormBuilder(),
    private http    : HttpService,
    private datePipe: DatePipe,
    private cache   : CacheService
  ) { }

  ngOnInit() {
    this._queryForm = this.fb.group({});
    this._node.map((res: any, idx) => {
      if (res.isHide) { this._showSlideBtn = true; }
      if (res.type === 'numbetween') {
        this._queryForm.addControl(res.valueKey[0], new FormControl(res.default ? res.default[0] : ''));
        this._queryForm.addControl(res.valueKey[1], new FormControl(res.default ? res.default[1] : ''));
      } else {
        this._queryForm.addControl(res.key, new FormControl(res.default || ''));
      }
      if (res.type === 'select') {
        res.optionKey = res.optionKey || { label: 'name', value: 'id' };
        if (res.optionsUrl) {
          this.cache.get(res.optionsUrl).subscribe( result => {
            res.options = (res.options || []).concat(result);
          })
        }
      }
      return res;
    });
  }


  _reset(): void {
    this._queryForm.reset();
  }

  _clearControlValue(key): void {
    this._queryForm.get(key).reset();
  }

  _submit(): void {
    let queryForm = this._queryForm.value;
    this._node.map((res: any) => {
      if (res.valueKey) {
        if (res.type === 'datepicker') {
          if (queryForm[res.key] && queryForm[res.key][0]) {
            queryForm[res.valueKey[0]] = this.datePipe.transform(queryForm[res.key][0].getTime(), 'yyyy-MM-dd');
            queryForm[res.valueKey[1]] = this.datePipe.transform(queryForm[res.key][1].getTime(), 'yyyy-MM-dd');
          }
        }
        if (res.type === 'numbetween') {
          if (!queryForm[res.valueKey[0]]) delete queryForm[res.valueKey[0]];
          if (!queryForm[res.valueKey[1]]) delete queryForm[res.valueKey[1]];
        }
        delete queryForm[res.key];
      }
      if (queryForm[res.key] === '' || queryForm[res.key] === null || queryForm[res.key] === undefined) {
        delete queryForm[res.key];
      }
    });

    console.log('抛出查询条件', queryForm);
    this.onSubmit.emit(queryForm);
  }

  numbetweenBlur(key: string): void {
    let initValue = {};
    if (this._queryForm.get(key).value == 0) { initValue[key] = ''; } 
    this._queryForm.patchValue(initValue)
  }

}

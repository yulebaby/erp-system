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



  constructor(
    private fb      : FormBuilder = new FormBuilder(),
    private http    : HttpService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this._queryForm = this.fb.group({});
    this._node.map((res: any, idx) => {
      this._queryForm.addControl(res.key, new FormControl(res.default || ''));
      if (res.type === 'select') {
        res.optionKey = res.optionKey || { label: 'label', value: 'value' };
        if (res.optionsUrl) {
          this.http.post(res.optionsUrl).then( result => {
            if (result.code == 1000) {
              res.options = (res.options || []).concat(result.result);
            }
          })
        }
      }
      return res;
    });
  }


  _reset(): void {
    this._queryForm.reset();
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
        delete queryForm[res.key];
      }
      if (queryForm[res.key] === '' || queryForm[res.key] === null || queryForm[res.key] === undefined) {
        delete queryForm[res.key];
      }
    });

    console.log('抛出查询条件', queryForm);
    this.onSubmit.emit(queryForm);
  }

}

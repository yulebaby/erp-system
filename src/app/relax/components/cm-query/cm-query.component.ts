import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cm-query',
  templateUrl: './cm-query.component.html',
  styleUrls: ['./cm-query.component.scss']
})
export class CmQueryComponent implements OnInit {

  @Input('node') _node  : object[] = [];

  @Output() _query      : EventEmitter<any> = new EventEmitter();

  _queryForm            : FormGroup;


  constructor(
    private fb      : FormBuilder = new FormBuilder()
  ) {
    this._queryForm = fb.group({});
    this._node.map( (res: any) => {
      this._queryForm.addControl(res.name, new FormControl());
    })
  }

  ngOnInit() {
  }

}

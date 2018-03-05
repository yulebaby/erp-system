import { HttpService } from './../../../relax/services/http/http.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllCustomerComponent implements OnInit {

  
  queryNode: object[] = [
    {
      label       : '宝宝姓名',
      key         : 'babyName',
      type        : 'input',
      default     : '默认值',
      placeholder : '请输入宝宝昵称'
    },
    {
      label       : '选择框',
      key         : 'sex',
      type        : 'select',
      options     : [ { label: '男', value: 1 }, { label: '女', value: 2 } ],
      placeholder : '请选择需要的值'
    },
    {
      label       : '选择框',
      key         : 'people',
      type        : 'select',
      options     : [ { name: '随便', id: 0 } ],
      optionsUrl  : '/common/recommenderList',
      optionKey   : { label: 'name', value: 'id' },
      placeholder : '请选择需要的值'
    },
    {
      label       : '时间区间',
      key         : 'timeSlot',
      type        : 'datepicker',
      valueKey    : ['timeStart', 'timeEnd'],
      placeholder : ['选择开始时间', '选择结束时间']
    },
    {
      label       : '隐藏输入框',
      key         : 'hide0',
      type        : 'select',
      options     : [ { label: '男', value: 1 }, { label: '女', value: 2 } ],
      placeholder : '请选择需要的值',
      isHide      : true
    },
    {
      label       : '隐藏输入框',
      key         : 'hide1',
      type        : 'select',
      options     : [ { name: '随便', id: 0 } ],
      optionsUrl  : '/common/recommenderList',
      optionKey   : { label: 'name', value: 'id' },
      placeholder : '请选择需要的值',
      isHide      : true
    },
    {
      label       : '隐藏输入框',
      key         : 'hide2',
      type        : 'select',
      options     : [ { label: '男', value: 1 }, { label: '女', value: 2 } ],
      placeholder : '请选择需要的值',
      isHide      : true
    },
    {
      label       : '隐藏输入框',
      key         : 'hide3',
      type        : 'select',
      options     : [ { name: '随便', id: 0 } ],
      optionsUrl  : '/common/recommenderList',
      optionKey   : { label: 'name', value: 'id' },
      placeholder : '请选择需要的值',
      isHide      : true
    },
  ]

  tableNode: any[]    = [
    {
      name  : '姓名',
      width : '120px'
    },
    {
      name  : '性别',
      width : '60px'
    },
    {
      name  : '电话',
      width : '120px'
    },
    {
      name  : '描述',
      width : '200px'
    }
  ]
  checkedItems: any[] = [];

  constructor( ) { }

  ngOnInit() {
  }

}
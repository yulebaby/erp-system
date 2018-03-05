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
      name  : '宝宝昵称',
      width : '100px'
    },
    {
      name  : '性别',
      width : '60px'
    },
    {
      name  : '月龄',
      width : '60px'
    },
    {
      name  : '家长姓名',
      width : '100px'
    },
    {
      name  : '家长电话',
      width : '100px'
    },
    {
      name  : '入库时间',
      width : '140px'
    },
    {
      name  : '来源',
      width : '80px'
    },
    {
      name  : '所属小区',
      width : '120px'
    },
    {
      name  : '跟进状态',
      width : '80px'
    },
    {
      name  : '跟进阶段',
      width : '120px'
    },
    {
      name  : '最后跟进时间',
      width : '140px'
    },
    {
      name  : '下次跟进时间',
      width : '140px'
    },
    {
      name  : '跟进销售',
      width : '80px'
    },
  ]
  checkedItems: any[] = [];

  constructor( ) { }

  ngOnInit() {
  }

}
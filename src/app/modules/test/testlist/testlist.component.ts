import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testlist',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.scss']
})
export class TestlistComponent implements OnInit {

  myContext = { $implicit: 'World', localSk: 'Svet' };

  queryNode: object[] = [
    {
      label       : '输入框',
      key         : 'name',
      type        : 'input',
      default     : '默认值',
      placeholder : 'placeholder内容'
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


  constructor() { 
  }

  ngOnInit() {
  }

  tapQuery(event: object): void{
    console.log('接受查询条件', event)
  }

  _tableCheckedChange(value) {
    console.log(value)
  }

}

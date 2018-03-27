import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  queryNode: object[] = [
    {
      label       : '活动名称',
      key         : 'activityName',
      type        : 'input',
      placeholder : '请输入活动名称'
    },
    {
      label       : '创建时间',
      key         : 'createTime',
      type        : 'datepicker',
      valueKey    : ['createStartTime', 'createEndTime'],
      placeholder : ['选择开始时间', '选择结束时间']
    },
    {
      label       : '有限客户',
      key         : 'effectiveUser',
      type        : 'numbetween',
      valueKey    : ['effectiveUserMin', 'effectiveUserMax']
    },
    {
      label       : '浏览数',
      key         : 'views',
      type        : 'input',
      placeholder : '请输入浏览数'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  c(e) {
    console.log(e)
  }

}

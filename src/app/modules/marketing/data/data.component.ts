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
      type        : 'numbetween',
      valueKey    : ['viewsMin', 'viewsMax']
    }
  ]

    tableNode: any[]    = [
    {
      name  : '活动名称',
      width : '140px'
    },
    {
      name  : '发布状态',
      width : '100px'
    },
    {
      name  : '有效用户',
      width : '100px'
    },
    {
      name  : '浏览数',
      width : '60px'
    },
    {
      name  : '活动时间',
      width : '60px'
    },
    {
      name  : '创建时间',
      width : '100px'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}

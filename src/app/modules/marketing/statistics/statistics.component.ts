import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  queryNode: object[] = [
    {
      label       : '家长电话',
      key         : 'mobilePhone',
      type        : 'input',
      placeholder : '请输入家长电话'
    },
    {
      label       : '提交时间',
      key         : 'time',
      type        : 'datepicker',
      valueKey    : ['startDate', 'endDate'],
      placeholder : ['选择开始时间', '选择结束时间']
    }
  ]
  

  tableNode: any[]    = [
    {
      name  : '编号',
      width : '80px'
    },
    {
      name  : '提交时间',
      width : '140px'
    },
    {
      name  : '宝宝姓名',
      width : '120px'
    },
    {
      name  : '宝宝生日',
      width : '120px'
    },
    {
      name  : '家长手机',
      width : '120px'
    },
    {
      name  : '贡献者',
      width : '120px'
    }
  ]

  @ViewChild('CmTable') CmTable;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  paramsDefault;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((res: any) => {
      this.paramsDefault = { activityId: res.params.id };
    })
  }


}

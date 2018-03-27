import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

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

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((res: any) => {
      console.log(res.params.id)
    })
  }

}

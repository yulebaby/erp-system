import { HttpService } from './../../../relax/services/http/http.service';
import { Component, OnInit } from '@angular/core';

import { DataSet } from '@antv/data-set';

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}];

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
      width : '240px'
    },
    {
      name  : '创建时间',
      width : '120px'
    },
    {
      name  : '统计',
      width : '80px'
    }
  ]

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
  }

  /* ------------------- Viser 图标配置信息 ------------------- */
  forceFit: boolean = true;
  scale = scale;
  pieStyle = {
    stroke: "#fff",
    lineWidth: 1,
  };
  labelConfig = ['percent', {
    formatter: (val, item) => {
      return `${item.point.collector} (${item.point.amount})`;
    },
  }];

  visibleChart(e, item): void {
    if (e && !item.chartInfo && !item.loading) {
      item.loading = true;
      this.http.post('/market/activityDataRank', { paramJson: JSON.stringify({ activityId: item.activityId }) }).then(res => {
        if (res.code == 1000) {
          const sourceData = res.result.list;
          const dv = new DataSet.View().source(sourceData);
          dv.transform({
            type: 'percent',
            field: 'amount',
            dimension: 'collector',
            as: 'percent'
          });
          const data = dv.rows;
          
          item.chartInfo = data;
        }
        item.loading = false;
      }, err => {
        item.loading = false;
      })
    }
  }

}

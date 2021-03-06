import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from './../../../relax/services/http/http.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nointention',
  templateUrl: './nointention.component.html',
  styleUrls: ['./nointention.component.scss']
})
export class NointentionComponent implements OnInit {

  queryNode: object[] = [
    {
      label       : '宝宝昵称',
      key         : 'nick',
      type        : 'input',
      placeholder : '请输入宝宝昵称'
    },
    {
      label       : '跟进状态',
      key         : 'followStageId',
      type        : 'select',
      optionsUrl  : '/common/followStageList',
      placeholder : '请选择跟进状态'
    },
    {
      label       : '来源',
      key         : 'sourceId',
      type        : 'select',
      optionsUrl  : '/common/sourceList',
      placeholder : '请选择客户来源'
    },
    {
      label       : '家长姓名',
      key         : 'parentName',
      type        : 'input',
      placeholder : '请输入家长姓名',
      isHide      : true
    }, 
    {
      label       : '手机号码',
      key         : 'mobilePhone',
      type        : 'input',
      placeholder : '请输入家长手机号码',
      isHide      : true
    },
    {
      label       : '宝宝性别',
      key         : 'sex',
      type        : 'select',
      options     : [ { name: '男', id: '男' }, { name: '女', id: '女' } ],
      placeholder : '请选择宝宝性别',
      isHide      : true
    },
    {
      label       : '宝宝生日',
      key         : 'birthday',
      type        : 'datepicker',
      valueKey    : ['babyBirthdayStart', 'babyBirthdayEnd'],
      placeholder : ['选择开始时间', '选择结束时间'],
      isHide      : true
    },
    {
      label       : '创建时间',
      key         : 'createTime',
      type        : 'datepicker',
      valueKey    : ['createDateStart', 'createDateEnd'],
      placeholder : ['选择开始时间', '选择结束时间'],
      isHide      : true
    },
    {
      label       : '下次跟进',
      key         : 'nextFollowTime',
      type        : 'datepicker',
      valueKey    : ['nextFollowTimeStart', 'nextFollowTimeEnd'],
      placeholder : ['选择开始时间', '选择结束时间'],
      isHide      : true
    },
    {
      label       : '最后跟进',
      key         : 'lastFollowTime',
      type        : 'datepicker',
      valueKey    : ['lastFollowTimeStart', 'lastFollowTimeEnd'],
      placeholder : ['选择开始时间', '选择结束时间'],
      isHide      : true
    },
    {
      label       : '收集者',
      key         : 'collectorId',
      type        : 'select',
      optionsUrl  : '/common/collectorList',
      placeholder : '请选择收集者',
      isHide      : true
    },
    {
      label       : '推荐人',
      key         : 'recommendedId',
      type        : 'select',
      optionsUrl  : '/common/recommenderList',
      placeholder : '请选择推荐人',
      isHide      : true
    },
  ];

  
  tableNode: any[]    = [
    {
      name  : '宝宝昵称',
      width : '100px'
    },
    {
      name  : '宝宝姓名',
      width : '100px'
    },
    {
      name  : '宝宝生日',
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
      name  : '所属小区',
      width : '140px'
    }, 
    {
      name  : '入库时间',
      width : '140px'
    },
    {
      name  : '下次跟进时间',
      width : '140px'
    },
    {
      name  : '最后跟进时间',
      width : '140px'
    },
    {
      name  : '来源',
      width : '80px'
    },
    {
      name  : '客户状态',
      width : '80px'
    },
    {
      name  : '跟进阶段',
      width : '120px'
    },
    {
      name  : '收集者',
      width : '120px'
    }
  ]

  checkedItems: any[] = [];

  @ViewChild('CmTable') table;

  constructor(
    private http    : HttpService,
    private message : NzMessageService 
  ) { }

  ngOnInit() {
  }

  gainClue(): void {
    this.http.post('/customer/gainClue', { paramJson: JSON.stringify({ id: this.checkedItems.join(',') }) }).then(res => {
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
      if (res.code == 1000) {
        this.checkedItems = [];
        this.table._request();
      }
    })
  }

}

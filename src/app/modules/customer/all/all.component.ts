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

  queryForm   : FormGroup;

  isCollapse  : boolean = true;

  pageInfo  : PageInfo = new PageInfo();

  dataSet     : any[] = [];

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private http: HttpService,
    private message: NzMessageService
  ) { 
    this.queryForm = fb.group({
      babyName              : [],         // 宝宝姓名
      followStage           : [],         // 跟进状态
      source                : [],         // 来源
      parentName            : [],         // 家长姓名
      mobilePhone           : [],         // 家长电话
      sex                   : [],         // 宝宝性别
      babyBirthdayStart     : [],         // 宝宝生日开始
      babyBirthdayEnd       : [],         // 宝宝生日结束
      createDateStart       : [],         // 创建日期开始
      createDateEnd         : [],         // 创建日期结束
      nextFollowTimeStart   : [],         // 下次跟进时间开始
      nextFollowTimeEnd     : [],         // 下次跟进时间结束
      lastFollowTimeStart   : [],         // 最后跟进时间开始
      lastFollowTimeEnd     : [],         // 最后跟进时间结束
      followSeller          : [],         // 负责销售
      collector             : [],         // 收集者
      recommended           : [],         // 推荐人
    });
  }

  ngOnInit() {
    this._query();
  }

  _query(isReset?: boolean): void {
    this.pageInfo.loading = true;
    let params = Object.assign({ paramJson: JSON.stringify(this.queryForm.value) },  { pageNum: this.pageInfo.pageNum, pageSize: this.pageInfo.pageSize } );
    this.http.post('/customer/potentialCustomerList', params).then( res => {
      if (res.code == 1000) {
        this.dataSet = res.result.memberList;
        this.pageInfo.totalPage = res.result.totalPage;
      } else {
        this.message.warning(res.info);
      }
      this.pageInfo.loading = false;
    });
  }
  _reset(): void {
    this.queryForm.reset();
  }

  tapClose(): void {
    console.log('点击了关闭')
  }

}

/** 
 * @interface   初始化分页信息
 * @description 2018-02-28
 */
class PageInfo {
  constructor(
    public loading   : boolean = false,
    public totalPage : number  = 0,
    public pageNum   : number  = 1,
    public pageSize  : number  = 10
  ) { }
}
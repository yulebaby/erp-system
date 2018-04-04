import { NzMessageService } from 'ng-zorro-antd';
import { Router, NavigationEnd } from '@angular/router';
import { HttpService } from './../../../relax/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../relax/services/cache/cache.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  /* -------- 查询条件 场景/节日集合 -------- */
  activityItems   : any[] = [];
  activityLoading : boolean;
  queryForm = {
    name: '',
    scencesId: [],
    festivalId: []
  };
  sceneItems    : any[] = [];
  festivalItems : any[] = [];

  constructor(
    private http    : HttpService,
    private cache   : CacheService,
    private router  : Router,
    private message : NzMessageService
  ) {
    cache.get('/market/scencesList').subscribe(res => this.sceneItems = res);
    cache.get('/market/festivalList').subscribe(res => this.festivalItems = res);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/home/marketing/activity') {
        this.searchSubmit();
      }
    })
  }

  ngOnInit() {
  }

  /* --------------------- 选择查询条件 --------------------- */
  queryCheckChange(checked: boolean, control: string, id) {
    if (checked) {
      this.queryForm[control].push(id);
    } else {
      this.queryForm[control].splice(this.queryForm[control].indexOf(id), 1);
    }
    this.searchSubmit();
  }
  queryCheckAll(checked: boolean, control: string): void {
    this.queryForm[control] = [];
    if (checked) { this.searchSubmit(); }
  }

  /* --------------------- 获取活动列表 --------------------- */
  searchSubmit(): void {
    if (this.activityLoading) { return; }
    this.activityLoading = true;
    let params = JSON.parse(JSON.stringify(this.queryForm));
    params.scencesId = params.scencesId.join(',');
    params.festivalId = params.festivalId.join(',');
    this.http.post('/market/marketingList', { paramJson: JSON.stringify(params) }).then(res => {
      this.activityLoading = false;
      if (res.code == 1000) {
        this.activityItems = res.result.list;
      }
    }, err => {
      this.activityLoading = false;
    })
  }

  joinActivity(item: any): void {
    if (item.loading) { return; }
    item.loading = true;
    this.http.post('/market/joinActivity', { paramJson: JSON.stringify({ id: item.id }) }).then(res => {
      item.loading = false;
    }, err => {
      item.loading = false;
    })
  }

  /* ---------------------- 取消参加 ---------------------- */
  cancelActivity(item): void {
    if (item.loading) { return; }
    item.loading = true;
    this.http.post('/market/cancelActivity', { paramJson: JSON.stringify({ id: item.id }) }).then(res => {
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
      item.loading = false;
      if (res.code == 1000) {
        item.status = 0;
      }
    }, err => {
      item.loading = false;
    })
  }


  previewImage = '';
  previewVisible = false;

  downloadImg(item: any): void {
    // this.previewImage = 'assets/index'
    this.previewVisible = true;
  }

}

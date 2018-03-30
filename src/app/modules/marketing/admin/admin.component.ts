import { NzMessageService } from 'ng-zorro-antd';
import { Router, NavigationEnd } from '@angular/router';
import { HttpService } from './../../../relax/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../relax/services/cache/cache.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  /* -------- 查询条件 场景/节日集合 -------- */
  adminItems    : any[] = [];
  adminLoading  : boolean;
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
      if (event instanceof NavigationEnd && event.url === '/home/marketing/admin') {
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

  /* --------------------- 获取模板列表 --------------------- */
  searchSubmit(): void {
    if (this.adminLoading) { return; }
    this.adminLoading = true;
    let params = JSON.parse(JSON.stringify(this.queryForm));
    params.scencesId = params.scencesId.join(',');
    params.festivalId = params.festivalId.join(',');
    this.http.post('/market/templateList', { paramJson: JSON.stringify(params) }).then( res => {
      this.adminLoading = false;
      if (res.code == 1000) {
        this.adminItems = res.result.list;
      }
    }, err => {
      this.adminLoading = false;
    })
  }


  /* ----------------------- 发布模板 ----------------------- */
  releaseTemplate(tmpl): void {
    tmpl.loading = true;
    this.http.post('/market/addActivity', { paramJson: JSON.stringify(tmpl), type: 1 }).then(res => {
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
      tmpl.loading = false;
      if (res.code == 1000) {
        tmpl.status = 1;
      }
    }, err => {
      tmpl.loading = false;
    })
  }
  /* ----------------------- 取消发布 ----------------------- */
  cancelRelease(tmpl): void {
    tmpl.loading = true;
    this.http.post('/market/cancelRelease', { paramJson: JSON.stringify({ id: tmpl.id }) }).then(res => {
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
      tmpl.loading = false;
      if (res.code == 1000) {
        tmpl.status = 0;
      }
    }, err => {
      tmpl.loading = false;
    })
  }

}

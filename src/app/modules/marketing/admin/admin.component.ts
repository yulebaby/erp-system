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
    private http  : HttpService,
    private cache : CacheService
  ) {
    cache.get('/market/scencesList').subscribe(res => this.sceneItems = res);
    cache.get('/market/festivalList').subscribe(res => this.festivalItems = res);
  }

  ngOnInit() {

    this.searchSubmit();
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

}

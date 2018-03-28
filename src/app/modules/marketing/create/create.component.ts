import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../../relax/services/http/http.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../relax/services/cache/cache.service';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  _activityId       : string;

  tmplFormModel     : FormGroup;
  activityFormModel : FormGroup;

  /* ---------------- 当前页 ---------------- */
  current   : number = 0;

  /* --------------- 模板数据 --------------- */
  _tmplDataset: TmplDataset;


  /* --------------- 存储信息/结果 --------------- */
  _saveLoading : boolean;
  _saveResult;
  

  constructor(
    private fb        : FormBuilder = new FormBuilder(),
    private routeInfo : ActivatedRoute,
    private cache     : CacheService,
    private http      : HttpService,
    private httpClient: HttpClient,
    private format    : DatePipe,
    private message   : NzMessageService
  ) { 
    this.tmplFormModel = fb.group({
      activityName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],     // 活动名称
      name        : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],     // 模板名称
      introduce   : ['', [Validators.required, Validators.maxLength(100)]],                             // 模板介绍
      address     : ['', [Validators.required, Validators.pattern(/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?/)], [this._tmplAsyncValidator]],
      scencesId   : ['', [Validators.required]],                                  // 模板场景
      festivalId  : ['', [Validators.required]],                                  // 模板节日
      isPermit    : [1],                                                          // 是否允许用户自定义字段
      agreement   : ['http://']
    });

    this.activityFormModel = fb.group({});
  }

  /* ---------------- 场景/节日数据 ---------------- */
  scencesList  : any[];
  festivalList : any[];


  getFormControl(name) {
    return this.tmplFormModel.controls[name];
  }

  ngOnInit() {

    this.routeInfo.paramMap.subscribe( (res: any) => {
      this._activityId = res.params.id;
    });

    /* ------------------ 获取场景/节日数据 ------------------ */
    this.cache.get('/market/scencesList').subscribe( res => {
      this.scencesList = res || [];
    });
    this.cache.get('/market/festivalList').subscribe(res => {
      this.festivalList = res || [];
    });

  }

  /* --------------------- 保存模板信息 --------------------- */
  _tmplSubmit(): void {
    if (this.tmplFormModel.invalid) {
      Object.values(this.tmplFormModel.controls).map( control => {
        control.markAsDirty();
      });
    } else {
      this.current += 1;
    }
  }
  _tmplInfoSubmit(): void {
    if (this.activityFormModel.invalid) {
      Object.values(this.activityFormModel.controls).map( control => {
        control.markAsDirty();
      })
    } else {
      let activityCustomizeInfo = JSON.parse(JSON.stringify(this.activityFormModel.value));
      activityCustomizeInfo.activityName = this.tmplFormModel.get('activityName').value;
      this._tmplDataset.configItems.map( (item: any) => {
        if (item.type === 'datepicker') {
          activityCustomizeInfo[item.key] = this.format.transform(activityCustomizeInfo[item.key], 'yyyy-MM-dd');
        }
        if (item.type === 'rangepicker') {
          activityCustomizeInfo[item.valueKey[0]] = this.format.transform(activityCustomizeInfo[item.key][0], 'yyyy-MM-dd');
          activityCustomizeInfo[item.valueKey[1]] = this.format.transform(activityCustomizeInfo[item.key][1], 'yyyy-MM-dd');
          delete activityCustomizeInfo[item.key];
        }
      });
      let params = JSON.parse(JSON.stringify(this.tmplFormModel.value));
      params.activityCustomizeInfo = JSON.stringify(activityCustomizeInfo);
      if (this._activityId != '0') { params.id = this._activityId; }
      this._saveLoading = true;
      this.http.post('/market/addTemplate', { paramJson: JSON.stringify(params) }).then( res => {
        this.current += 1;
        this._saveLoading = false;
        this._saveResult = res;
      }, err => this._saveLoading = false )
    }
  }

  /* ------------------------ 验证模板地址是否合法 ------------------------ */
  _tmplAsyncValidator = (control: FormControl): Observable<any> => {
    return Observable.create( observer => {
      this.httpClient.get(`${this.tmplFormModel.get('agreement').value}${control.value}/ylbb-conf.json`)
      .subscribe((res: any) => {
        if (res.key && res.key === 'ylbb-conf') {
          this.activityFormModelInit(res);
        }
        observer.next(res.key === 'ylbb-conf' ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next({ error: true, duplicated: true });
        observer.complete();
      })
    })
  }

  activityFormModelInit(e: TmplDataset): void {
    this._tmplDataset = e;
    this._tmplDataset.configItems.map( (item: any) => {
      let validators = [];
      if (item.required) { validators.push(Validators.required); }
      if (item.pattern) { validators.push(Validators.pattern(new RegExp(item.pattern))); console.log(item.pattern)}
      
      this.activityFormModel.addControl(item.key, new FormControl('', validators));
    })
  }

}


interface TmplDataset {
  name        : string;
  key         : string;
  configItems : object[];
  status      : number;
  createTime  : string;
  author      : string;
}
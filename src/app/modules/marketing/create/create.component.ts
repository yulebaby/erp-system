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

  /* ----------- 模板/活动表单模型 ----------- */
  tmplFormModel     : FormGroup;
  activityFormModel : FormGroup;

  /* ---------------- 当前页 ---------------- */
  current   : number = 0;

  /* --------------- 模板数据 --------------- */
  _tmplDataset: TmplDataset;


  /* ------------- 存储信息/结果 ------------- */
  _saveLoading : boolean;
  _saveResult;


  /* ---------------- 场景/节日数据 ---------------- */
  scencesList: any[];
  festivalList: any[];
  

  constructor(
    private fb        : FormBuilder = new FormBuilder(),
    private routeInfo : ActivatedRoute,
    private cache     : CacheService,
    private http      : HttpService,
    private httpClient: HttpClient,
    private format    : DatePipe,
    private message   : NzMessageService
  ) {
    /* ------------------- 初始化表单模型 ------------------- */
    this.tmplFormModel = fb.group({
      activityName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],     // 活动名称
      name        : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],     // 模板名称
      introduce   : ['', [Validators.required, Validators.maxLength(100)]],                             // 模板介绍
      thumbnail   : [''],                                                                               // 缩略图
      address     : ['', [Validators.required, Validators.pattern(/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?/)], [this._tmplAsyncValidator]],
      scencesId   : ['', [Validators.required]],                                  // 模板场景
      festivalId  : ['', [Validators.required]],                                  // 模板节日
      isPermit    : [1],                                                          // 是否允许用户自定义字段
      agreement   : ['http://']
    });
    this.activityFormModel = fb.group({});
  }


  getFormControl(name) {
    return this.tmplFormModel.controls[name];
  }

  ngOnInit() {

    /* ------------------ 获取模板ID(0 => 新建) ------------------ */
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
  /* --------------------- 保存活动信息 --------------------- */
  _tmplInfoSubmit(): void {
    if (this.activityFormModel.invalid) {
      Object.values(this.activityFormModel.controls).map( control => {
        control.markAsDirty();
      })
    } else {
      /* --------------------- 深拷贝活动表单数据 --------------------- */
      let activityCustomizeInfo = JSON.parse(JSON.stringify(this.activityFormModel.value));
      activityCustomizeInfo.activityName = this.tmplFormModel.get('activityName').value;
      /* --------------------- 修改时间格式 --------------------- */
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
      /* ---------------- 深拷贝模板表单数据; 合并模板/活动数据 ---------------- */
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
        if (res.status && res.status > 0) {
          this.activityFormModelInit(res);
        }
        observer.next(res.status && res.status > 0 ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next({ error: true, duplicated: true });
        observer.complete();
      })
    })
  }

  /* ------------------- 根据模板配置文件实例化活动表单模型 ------------------- */
  activityFormModelInit(e: TmplDataset): void {
    this._tmplDataset = e;
    this.tmplFormModel.patchValue({
      thumbnail: this._tmplDataset.thumbnail
    });
    this._tmplDataset.configItems.map( (item: any) => {
      let validators = [];
      if (item.required) { validators.push(Validators.required); }
      if (item.pattern) { validators.push(Validators.pattern(new RegExp(item.pattern))); console.log(item.pattern)}
      
      this.activityFormModel.addControl(item.key, new FormControl('', validators));
    })
  }

}


/**
 * @interface 活动配置文件
 * @param name        活动名称
 * @param thumbnail   缩略图
 * @param status      0=> 活动结束 -1=> 活动暂停 1=>活动正常
 * @param configItems => 
 *                        label       <必填> : 展示文字
 *                        type        <必填> : 类型 可选值> input / select / detepicker / rangepicker
 *                        key         <必填> : 存储key
 *                        valueKey    <rangepicker 下可选>
 *                        placeholder <可选/rangepicker 下为数组>
 *                        required    <可选> : 是否为必填项
 *                        pattern     <可选> : 输入限制RegExp
 *                        errorText   <可选> : 错误提示文案
 * @param createTime  创建时间
 * @param author      活动作者
 */
interface TmplDataset {
  name        : string;
  key         : string;
  thumbnail   : string;
  configItems : object[];
  status      : number;
  createTime  : string;
  author      : string;
}
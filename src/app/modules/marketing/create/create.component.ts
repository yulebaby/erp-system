import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../../relax/services/http/http.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../relax/services/cache/cache.service';
import { DatePipe } from '@angular/common';

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
  current   : number = 1;

  /* --------------- 模板数据 --------------- */
  _tmplDataset: TmplDataset;
  

  constructor(
    private fb        : FormBuilder = new FormBuilder(),
    private routeInfo : ActivatedRoute,
    private cache     : CacheService,
    private http      : HttpService,
    private httpClient: HttpClient,
    private format    : DatePipe
  ) { 
    this.tmplFormModel = fb.group({
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

    this.activityFormModelInit({
      "name": "活动名称",
      "key": "ylbb-conf",
      "configItems": [
        {
          "label": "活动名称",
          "type": "input",
          "key": "activityName",
          "placeholder": "请输入活动名称",
          "errorText": "请输入2-10位字符!",
          "required": true,
          "pattern": "^[0-9]*$"
        },
        {
          "label": "活动价格",
          "type": "select",
          "key": "price",
          "options": [
            {
              "id": 1,
              "name": "01-10"
            },
            {
              "id": 2,
              "name": "10-20"
            }
          ],
          "optionsKey": {
            "label": "name",
            "value": "id"
          },
          "required": true
        },
        {
          "label": "生日",
          "type": "datepicker",
          "key": "time",
          "required": true
        },
        {
          "label": "活动日期",
          "type": "rangepicker",
          "key": "rangepicker",
          "valueKey": [
            "startTime",
            "endTime"
          ],
          "placeholder": ["开始日期", "结束日期"],
          "required": true
        }
      ],
      "status": 1,
      "createTime": "2018-03-22",
      "author": "phuhoang"
    })

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
      let params = Object.assign(JSON.parse(JSON.stringify(this.activityFormModel.value)), JSON.parse(JSON.stringify(this.tmplFormModel.value)));
      this._tmplDataset.configItems.map( (item: any) => {
        if (item.type === 'datepicker') {
          params[item.key] = this.format.transform(params[item.key], 'yyyy-MM-dd');
        }
        if (item.type === 'rangepicker') {
          params[item.valueKey[0]] = this.format.transform(params[item.key][0], 'yyyy-MM-dd');
          params[item.valueKey[1]] = this.format.transform(params[item.key][1], 'yyyy-MM-dd');
          delete params[item.key];
        }
      });
      if (this._activityId != '0') { params.id = this._activityId; }
      this.http.post('/market/addTemplate', { paramJson: JSON.stringify(params) }).then( res => {

      })
    }
  }

  /* ------------------------ 验证模板地址是否合法 ------------------------ */
  _tmplAsyncValidator = (control: FormControl): Observable<any> => {
    return Observable.create( observer => {
      this.httpClient.get(`${this.tmplFormModel.get('agreement').value}${control.value}/ylbb-conf.json`).subscribe((res: any) => {
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
import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../../relax/services/http/http.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../relax/services/cache/cache.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  tmplFormModel: FormGroup;

  /* ---------------- 当前页 ---------------- */
  current   : number = 0;

  /* --------------- 模板数据 --------------- */
  private _tmplDataset: TmplDataset;
  

  constructor(
    private fb        : FormBuilder = new FormBuilder(),
    private routeInfo : ActivatedRoute,
    private cache     : CacheService,
    private http      : HttpService,
    private httpClient: HttpClient
  ) { 
    this.tmplFormModel = fb.group({
      name        : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],     // 模板名称
      introduce   : ['', [Validators.required, Validators.maxLength(100)]],                             // 模板介绍
      address     : ['', [Validators.required, Validators.pattern(/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?/)], [this._tmplAsyncValidator]],
      scencesId   : ['', [Validators.required]],                                  // 模板场景
      festivalId  : ['', [Validators.required]],                                  // 模板节日
      isPermit    : [1],                                                          // 是否允许用户自定义字段
      agreement   : ['http://']
    })
  }

  /* ---------------- 场景/节日数据 ---------------- */
  scencesList  : any[];
  festivalList : any[];


  getFormControl(name) {
    return this.tmplFormModel.controls[name];
  }

  ngOnInit() {
    this.routeInfo.paramMap.subscribe( (res: any) => {

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
        control.markAsDirty()
      });
    } else {
      this.current += 1;
    }
  }

  _tmplAsyncValidator = (control: FormControl): Observable<any> => {
    return Observable.create( observer => {
      this.httpClient.get(`${this.tmplFormModel.get('agreement').value}${control.value}/ylbb-conf.json`).subscribe((res: any) => {
        if (res.key && res.key === 'ylbb-conf') {
          this._tmplDataset = res;
        }
        observer.next(res.key === 'ylbb-conf' ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next({ error: true, duplicated: true });
        observer.complete();
      })
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
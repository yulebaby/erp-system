import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../../relax/services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../relax/services/cache/cache.service';
import { DatePipe } from '@angular/common';
import { Subscription, Observable } from 'rxjs';

declare const OSS;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  _activityId       : string;
  lookTemplateInfo;
  lookTemplateInfoLoading: boolean;

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


  /* ------------- 场景/节日数据 ------------- */
  scencesList: any[];
  festivalList: any[];


  private aliOssClient;
  

  constructor(
    private fb        : FormBuilder = new FormBuilder(),
    private routeInfo : ActivatedRoute,
    private cache     : CacheService,
    private http      : HttpService,
    private httpClient: HttpClient,
    private format    : DatePipe,
    private message   : NzMessageService,
    private router    : Router
  ) {
    /* ------------------- 初始化表单模型 ------------------- */
    this.tmplFormModel = fb.group({
      name        : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],     // 模板名称
      introduce   : ['', [Validators.required, Validators.maxLength(100)]],                             // 模板介绍
      thumbnail   : [''],                                                                               // 缩略图
      standardDiagram: [''],                                                                            // 推广标准图
      address     : ['', [Validators.required, Validators.pattern(/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?/)], [this._tmplAsyncValidator]],
      scencesId   : ['', [Validators.required]],                                  // 模板场景
      festivalId  : ['', [Validators.required]],                                  // 模板节日
      isPermit    : ['1'],                                                        // 是否允许用户自定义字段
      agreement   : ['http://']
    });
    this.activityFormModel = fb.group({});

    /* ----------------- 获取OSS上传凭证 ----------------- */
    httpClient.get<any>('http://oss.beibeiyue.com/oss/getOSSToken?type=4').subscribe(res => {
      if (res.result == 0) {
        let creds = res.data;
        this.aliOssClient = new OSS.Wrapper({
          region: 'oss-cn-beijing',
          accessKeyId: creds.accessKeyId,
          accessKeySecret: creds.accessKeySecret,
          stsToken: creds.securityToken,
          bucket: 'ylbb-business'
        });
      }
    })
  }


  getFormControl(name) {
    return this.tmplFormModel.controls[name];
  }

  ngOnInit() {

    /* ---------------- 获取模板ID(0 => 新建) ---------------- */
    this.routeInfo.paramMap.subscribe( (res: any) => {
      this._activityId = res.params.id;
      if (this._activityId != '0') {
        this.lookTemplateInfoLoading = true;
        this.http.post('/market/lookTemplateInfo', { paramJson: JSON.stringify({id: this._activityId}) }).then( res => {
          this.lookTemplateInfoLoading = false;
          if (res.code == 1000) {
            res.result.address = res.result.address.substr(0, 4) == 'http' ? res.result.address.split('://')[1] : res.result.address;
            this.lookTemplateInfo = res.result;
            this.tmplFormModel.patchValue(res.result);
          }
        }, err => {
          this.lookTemplateInfoLoading = false;
        })
      }
    });

    /* ------------------ 获取场景/节日数据 ------------------ */
    this.cache.get('/market/scencesList').subscribe(res => this.scencesList = res || []);
    this.cache.get('/market/festivalList').subscribe(res => this.festivalList = res || []);

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
      /* --------------------- 修改时间格式 --------------------- */
      this._tmplDataset.configItems.map( (item: any) => {
        if (item.type === 'datepicker') {
          activityCustomizeInfo[item.key] = this.format.transform(activityCustomizeInfo[item.key], 'yyyy-MM-dd');
        }
        if (item.type === 'rangepicker') {
          activityCustomizeInfo[item.key][0] = this.format.transform(activityCustomizeInfo[item.key][0], 'yyyy-MM-dd');
          activityCustomizeInfo[item.key][1] = this.format.transform(activityCustomizeInfo[item.key][1], 'yyyy-MM-dd');
          activityCustomizeInfo[item.valueKey[0]] = activityCustomizeInfo[item.key][0];
          activityCustomizeInfo[item.valueKey[1]] = activityCustomizeInfo[item.key][1];
        }
      });
      /* ---------------- 深拷贝模板表单数据; 合并模板/活动数据 ---------------- */
      let params = JSON.parse(JSON.stringify(this.tmplFormModel.value));
      params.address = params.agreement + params.address;
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
          this.activityFormModelInit(res, this.lookTemplateInfo && this.lookTemplateInfo.address == control.value);
        }
        observer.next(res.status && res.status > 0 ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next({ error: true, duplicated: true });
        observer.complete();
      })
    })
  }

  /* ------------------ 根据模板配置文件实例化活动表单模型 ------------------ */
  activityFormModelInit(e: TmplDataset, ident?: boolean): void {
    this._tmplDataset = e;
    this.tmplFormModel.patchValue({
      thumbnail: this._tmplDataset.thumbnail
    });

    var activityCustomizeInfo;
    if (ident) {
      activityCustomizeInfo = JSON.parse(this.lookTemplateInfo.activityCustomizeInfo);
    }

    this.activityFormModel = this.fb.group({});
    this._tmplDataset.configItems.map( (item: any) => {
      let validators = [];
      if (item.required) { validators.push(Validators.required); }
      if (item.pattern) { validators.push(Validators.pattern(new RegExp(item.pattern))); }

      if (ident) {
        if (item.type == 'rangepicker') {
          this.activityFormModel.addControl(item.key, new FormControl([new Date(activityCustomizeInfo[item.key][0]), new Date(activityCustomizeInfo[item.key][1])], validators));
        } else {
          this.activityFormModel.addControl(item.key, new FormControl(activityCustomizeInfo[item.key], validators));
        }
      } else {
        this.activityFormModel.addControl(item.key, new FormControl('', validators));
      }
    });
  }

  /* ----------------------------- 发布模板 ----------------------------- */
  releaseTemplate(): void {
    this.http.post('/market/addActivity', { paramJson: JSON.stringify(this._saveResult.result), type: 1 }).then(res => {
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
      if (res.code == 1000) {
        this.router.navigateByUrl('/home/marketing/admin');
      }
    })
  }



  /* ----------------------------- 上传图片 ----------------------------- */
  fileList = [];
  previewImage = '';
  previewVisible = false;

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  upload = (file: any) => {

    let fileType = file.file.name.split('.')[file.file.name.split('.').length - 1].toLowerCase();
    let fileName = `${new Date().getTime() + this.mathRand()}.${fileType}`;
    this.aliOssClient.multipartUpload(fileName, file.file, { 
      progress: (p) => {
        return function (done) {
          file.onProgress({ percent: Math.floor(p * 100) })
          done();
        }
      }
    }).then(res => {
      file.onSuccess({}, {
        uid: file.file.uid,
        name: fileName,
        status: 'done',
        url: res.url
      });
    }, err => {
      file.onError();
      this.message.error('图片上传失败');
    })
  }

  /* ------------------- 生成6位随机数 ------------------- */
  private mathRand(): string {
    let num = '';
    for (let i = 0; i < 6; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
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



/**
 * @module 创建/修改活动模板;主要逻辑概述
 * 
 * @method 监听路由参数变化,0=>新增-----其他代表编辑
 *
 * @method 自定义模板地址验证的时候;只需要输入模板所在地址文件夹即可,因为验证的时候会自动拼接上'ylbb-conf.json',所以需要把'/index.html'去掉
 * @method 如果模板地址通过验证,则会直接把模板的缩略图地址保存到模板的表单模型中;
 * 
 * @method 编辑时根据Id模板Id查询,根据查询结果回显数据
 * @method  (特别注意address参数);因为保存时是自动添加上'http://'或者'https://'的,所以回显的时候要把'http://'删除掉
 * @method 编辑的时候会自动根据模板地址验证一次,所以需要加上判断;当前验证的地址和回显的数据地址是否是同一个地址,如果是同一个地址则可以回显自定义信息的数据
 * 
 * @method 保存的时候;模板地址'address'会自动拼接上'http://'或者'https://'
 * @method 保存的时候;如果自定义信息有时间区间选项,则需要把时间转换成yyyy-MM-dd格式,用于回显;否则回显后无法修改时间
 * @method 时间区间'rangepicker'默认值只能为时间戳格式,否则没办法修改时间
 * 
 * @method 保存的时候;推广图地址会由数组转换成字符串,以逗号分隔;回显的时候再由字符串转换成数组
 * 
 */
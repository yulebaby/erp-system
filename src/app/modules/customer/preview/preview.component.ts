import { DatePipe } from '@angular/common';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpService } from './../../../relax/services/http/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewCustomerComponent implements OnInit {

  /* ------------ 客户ID ------------ */
  _id             : string;

  /* ------------ 用户信息 ------------ */
  userInfo        : any;
  currentUserName : string;

  /* ------------ 跟进记录 ------------ */
  followRecord    : any[] = [];

  /* ------------ 标签列表 ------------ */
  labelList       : any[] = [];

  /* ---------- 请求loading ---------- */
  isLoading       : boolean;

  /* ---------- 记录表单模型 ---------- */
  recordFormModel : FormGroup;

  _updateFollowRecordFormModel: FormGroup;

  
  followTypeList  : any[] = [];
  showMemberStatus: any[] = [];

  constructor(
    private routeInfo : ActivatedRoute,
    private fb        : FormBuilder = new FormBuilder(),
    private http      : HttpService,
    private message   : NzMessageService,
    private format    : DatePipe,
    private modal     : NzModalService
  ) { }

  ngOnInit() {

    /* ------------------- 查看用户信息 ------------------- */
    this.routeInfo.params.subscribe( param => {
      this._id = param.id;
      this.isLoading = true;
      this.http.post('/customer/showCustomerInfo', { paramJson: JSON.stringify({ id: this._id }) }).then( res => {
        this.isLoading = false;
        this.userInfo = res.result.member || {};
        this.currentUserName = res.result.currentUserName;
        if (res.code != 1000) {
          this.message.warning(res.info);
        }
      })
    })

    /* ------------------- 查看跟进记录 ------------------- */
    this.http.post('/customer/showFollowRecord', { paramJson: JSON.stringify({ id: this._id}) }).then( res => {
      if (res.code == 1000) {
        this.followRecord = res.result;
      }
      this.followRecord.map( item => {
        item.contentLabel = this._resetFollowRecordContent(item.content);
      })
    })

    /* ------------------- 获取记录标签 ------------------- */
    this.http.post('/common/labelList').then( res => {
      if (res.code == 1000) {
        this.labelList = res.result;
      }
    })

    this.recordFormModel = this.fb.group({
      content       : ['', [Validators.required, Validators.max(200)]],     // 记录内容
      status        : [false],                                              // 是否预约过
      followType    : ['', [Validators.required]],                          // 跟进方式
      followStage   : ['', [Validators.required]],                          // 跟进状态
      nextFollowTime: ['']                                                  // 下次跟进时间
    });
    this._updateFollowRecordFormModel = this.fb.group({
      id            : [''],
      memberId      : [''],
      content       : ['', [Validators.required, Validators.max(200)]],
      status        : [false],                                         
      followType    : ['', [Validators.required]],                     
      followStage   : ['', [Validators.required]],                     
      nextFollowTime: ['']                                             
    });


    /* ------------------- 客户状态 ------------------- */
    this.http.post('/common/showMemberStatus').then(res => {
      if (res.code == 1000) {
        this.showMemberStatus = res.result;
      }
    });
    /* ------------------- 跟进方式 ------------------- */
    this.http.post('/common/followTypeList').then(res => {
      if (res.code == 1000) {
        this.followTypeList = res.result;
      }
    })
  }


  /* ------------------- 点击记录标签 ------------------- */
  tapTag(value: string, form: FormGroup): void {
    form.patchValue({
      content: form.get('content').value + value
    });
  }

  /* ------------------- 发布跟进记录 ------------------- */
  _submitFollowRecord(): void {
    for (const key in this.recordFormModel.controls) {
      this.recordFormModel.controls[key].markAsDirty();
    }

    if (this.recordFormModel.valid) {
      let params = this.recordFormModel.value;
      params.memberId = this._id;
      params.nextFollowTime = params.nextFollowTime ? this.format.transform(params.nextFollowTime, 'yyyy-MM-dd') : '';
      params.status = params.status ? 0 : 1;
      this.http.post('/customer/addFollowRecord', { paramJson: JSON.stringify(params) }).then( res => {
        this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
        if (res.code == 1000) {
          res.result.contentLabel = this._resetFollowRecordContent(res.result.content);
          this.followRecord.unshift(res.result);
          this.recordFormModel.reset();
        }
      })
    }
  }

  /* -------------------- 转为无意向客户 -------------------- */
  intentionCustomer(): void {
    this.http.post('/customer/transitioNoIntentionCustomer', { paramJson: JSON.stringify({ id: this._id }) }).then( res => {
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
    });
  }

  /* -------------------- 修改跟进记录 -------------------- */
  _followRecordModal;
  updateFollowRecord(title, content, footer, item): void {
    this._followRecordModal = this.modal.open({
      title   : title,
      content : content,
      footer  : footer,
      width   : 700
    });
    let controls = {
      id             : item.id,
      content        : item.content,
      followStage    : item.followStage,
      followType     : item.followType,
      memberId       : item.memberId,
      nextFollowTime : item.nextFollowTime,
      status         : item.status == 0
    };
    this._updateFollowRecordFormModel.patchValue(controls);
  }
  _saveUpdateFollowRecordLoading: boolean = false;
  saveUpdateFollowRecord(): void {
    for (const key in this._updateFollowRecordFormModel.controls) {
      this._updateFollowRecordFormModel.controls[key].markAsDirty();
    }

    if (this._updateFollowRecordFormModel.valid && !this._saveUpdateFollowRecordLoading) {
      this._saveUpdateFollowRecordLoading = true;

      let params = this._updateFollowRecordFormModel.value;
      params.nextFollowTime = params.nextFollowTime ? this.format.transform(params.nextFollowTime, 'yyyy-MM-dd') : '';
      params.status = params.status ? 0 : 1;
      this.http.post('/customer/addFollowRecord', { paramJson: JSON.stringify(params) }).then(res => {
        this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
        this._saveUpdateFollowRecordLoading = false;
        if (res.code == 1000) {
          res.result.contentLabel = this._resetFollowRecordContent(res.result.content);
          this.followRecord.map(item => {
            if (item.id === this._updateFollowRecordFormModel.value.id) {
              item.content        = res.result.content;
              item.followStage    = res.result.followStage;
              item.followType     = res.result.followType;
              item.nextFollowTime = res.result.nextFollowTime;
              item.status         = res.result.status;
              item.contentLabel   = res.result.contentLabel;
            }
          });
          this._followRecordModal.destroy()
        }
      })
    }
  }


  /* -------------------- 修改到店记录状态 -------------------- */
  editToShopRecord(status: number): void {
    this.http.post('/customer/editToShopRecord', { paramJson: JSON.stringify({ id: this._id, status: status }) }).then(res => {
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
    })
  }

  /* -------------------- 获取电话号码 -------------------- */
  getPhone(): void {
    if (!this.userInfo.phone) {
      this.http.post('/common/lookParentTelphone', { paramJson: JSON.stringify({ id: this._id }) }).then( res => {
        if (res.code == 1000) {
          this.userInfo.phone = res.result.mobilePhone
        }
      })
    }
  }



  /* -------------------- 设置跟进记录内容标签展示 -------------------- */
  _resetFollowRecordContent(content: string): string {
    let matchArray = content.match(/#(.*?)#/g);
    if (matchArray) {
      matchArray.map(res => {
        content = content.replace(new RegExp(res, 'g'), `<a href="javascript:;">${res}</a>`);
      })
    }
    return content;
  }


}

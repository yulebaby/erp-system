import { NzMessageService } from 'ng-zorro-antd';
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

  _id             : string;

  userInfo        : any;

  isLoading       : boolean;

  recordFormModel : FormGroup;

  constructor(
    private routeInfo : ActivatedRoute,
    private fb        : FormBuilder = new FormBuilder(),
    private http      : HttpService,
    private message   : NzMessageService
  ) { 
    this.recordFormModel = fb.group({
      content       : ['', [Validators.required, Validators.max(200)]],     // 记录内容
      reservation   : [false],                                              // 是否预约过
      followType    : ['', [Validators.required]],                          // 跟进方式
      followStatus  : ['', [Validators.required]],                          // 跟进状态
      nextFollowTime: ['']                                                  // 下次跟进时间
    })
  }

  ngOnInit() {
    this.routeInfo.params.subscribe( param => {
      this._id = param.id;
      this.isLoading = true;
      this.http.post('/customer/showCustomerInfo', { paramJson: JSON.stringify({ id: this._id }) }).then( res => {
        this.isLoading = false;
        this.userInfo = res.result || {};
        if (res.code != 1000) {
          this.message.warning(res.info);
        }
      })
    })
  }

  tapTag(value: string): void {
    this.recordFormModel.patchValue({
      content: this.recordFormModel.get('content').value + value
    });
  }

  _submitForm(): void {
    for (const key in this.recordFormModel.controls) {
      this.recordFormModel.controls[key].markAsDirty();
    }

    console.log(this.recordFormModel.value)
  }

  /* -------------------- 转为无意向客户 -------------------- */
  intentionCustomer(): void {
    this.http.post('/customer/transitioNoIntentionCustomer', { id: this._id }).then( res => {
      this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
    })
  }


}

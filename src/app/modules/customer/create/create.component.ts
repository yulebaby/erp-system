import { HttpService } from './../../../relax/services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  _id          : string;

  _loading     : boolean;

  customerForm : FormGroup;

  constructor(
    private fb        : FormBuilder = new FormBuilder(),
    private routeInfo : ActivatedRoute,
    private router    : Router,
    private http      : HttpService,
    private message   : NzMessageService,
    private modal     : NzModalService
  ) { 
    this.customerForm = fb.group({
      followStage   : ['', [Validators.required]],                                                      // 跟进阶段
      nick          : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],   // 宝宝昵称
      babyName      : [''],                                                                             // 宝宝姓名
      sex           : ['男'],                                                                           // 宝宝星币
      ethnic        : [''],                                                                             // 民族
      babyBirthday  : [''],                                                                             // 宝宝生日
      constellation : [''],                                                                             // 星座
      babyType      : [''],                                                                             // 宝宝类型
      communityId   : [''],                                                                             // 所属小区
      remarks       : [''],                                                                             // 备注

      parentName    : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],   // 家长姓名
      mobilePhone   : ['', [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]],
      parentType    : ['', [Validators.required]],                                                      // 家长身份
      qq            : [''],                                                                             // 家长QQ或者微信

      source        : ['', [Validators.required]],                                                      // 来源
      recommended   : [''],                                                                             // 推荐人
      collector     : [''],                                                                             // 收集人
    })
  }

  ngOnInit() {
    this.routeInfo.paramMap.subscribe( (res: any) => {
      this._id = res.params.id;
    })
  }

  _submit(): void {
    if (this.customerForm.invalid) {
      for (let i in this.customerForm.controls) {
        this.customerForm.controls[i].markAsDirty();
      }
    } else {
      this._loading = true;
      let params = this._id == '0' ? this.customerForm.value : Object.assign(this.customerForm.value, {id: this._id});
      this.http.post('/customer/modifyUserInfo', { paramJson: JSON.stringify(params) }).then( res => {
        this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
        if (res.code == 1000) {
          this.router.navigateByUrl('/home/customer/all');
        } else {
          this._loading = false;
        }
      })
    }
  }

  getFormControl(name) {
    return this.customerForm.controls[name];
  }


  private ceateHousingModal;
  housingName     : string;
  isConfirmLoading: boolean = false;
  ceateHousing(title, content, footer): void {
    this.ceateHousingModal = this.modal.open({
      title: title,
      content: content,
      footer: footer,
      onOk() {
        console.log('Click ok');
      }
    });
  }
  submitHousing(): void {
    if (this.housingName.length) {
      // this.http.post(``)
    }
  }

}

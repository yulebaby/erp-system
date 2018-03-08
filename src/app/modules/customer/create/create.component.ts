import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  _id          : string;

  customerForm : FormGroup;

  constructor(
    private fb        : FormBuilder = new FormBuilder(),
    private routeInfo : ActivatedRoute
  ) { 
    this.customerForm = fb.group({
      followStage   : ['', [Validators.required]],                                                // 跟进阶段
      babyNick      : ['', [Validators.required, Validators.max(20), Validators.min(2)]],         // 宝宝昵称
      babyName      : [''],                                                                       // 宝宝姓名
      sex           : [1],                                                                        // 宝宝星币
      ethnic        : [''],                                                                       // 民族
      babyBirthday  : [''],                                                                       // 宝宝生日
      constellation : [''],                                                                       // 星座
      babyType      : [''],                                                                       // 宝宝类型
      communityId   : [''],                                                                       // 所属小区
      remarks       : [''],                                                                       // 备注

      parentName    : ['', [Validators.required, Validators.max(20), Validators.min(2)]],         // 家长姓名
      mobilePhone   : ['', [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]],
      parentType    : ['', [Validators.required]],                                                // 家长身份
      qq            : [''],                                                                       // 家长QQ或者微信

      source        : ['', [Validators.required]],                                                // 来源
      recommended   : [''],                                                                       // 推荐人
      collector     : [''],                                                                       // 收集人
    })
  }

  ngOnInit() {
    this.routeInfo.paramMap.subscribe( (res: any) => {
      console.log(res.params)
      this._id = res.params.id;
    })
  }

  _submit(): void {
    
  }

  getFormControl(name) {
    return this.customerForm.controls[name];
  }

}

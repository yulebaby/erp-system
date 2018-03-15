import { MonthdiffPipe } from './../pipes/monthdiff.pipe';
import { DatePipe } from '@angular/common';
import { HttpService } from './../../../relax/services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  _id            : string;

  _submitLoading : boolean;

  _selectLoading : boolean;

  customerForm   : FormGroup;

  collectorList     : any[] = [];
  recommenderList   : any[] = []; 
  sourceList        : any[] = [];
  parentIdentityList: any[] = [];
  followStageList   : any[] = [];
  showCommunityList : any[] = [];

  constructor(
    private fb        : FormBuilder = new FormBuilder(),
    private routeInfo : ActivatedRoute,
    private router    : Router,
    private http      : HttpService,
    private message   : NzMessageService,
    private modal     : NzModalService,
    private format    : DatePipe,
    private monthDiff : MonthdiffPipe
  ) { 
  }

  ngOnInit() {
    this.routeInfo.paramMap.subscribe( (res: any) => {
      this._id = res.params.id;

      this._customerFormInit();
      if (this._id != '0') {
        this._selectLoading = true;
        this.http.post('/customer/showCustomerInfo', { paramJson: JSON.stringify({ id: this._id }) }).then(res => {
          this._selectLoading = false;
          if (res.code == 1000 ){
            res.result.member.birthday = res.result.member.birthday ? new Date(res.result.member.birthday) : '';
            this.customerForm.patchValue(res.result.member);
          }
        })
      }

    });

    this.http.post('/common/collectorList').then( res => {
      if (res.code == 1000) {
        this.collectorList = res.result;
      }
    })
    this.http.post('/common/recommenderList').then(res => {
      if (res.code == 1000) {
        this.recommenderList = res.result;
      }
    })
    this.http.post('/common/sourceList').then(res => {
      if (res.code == 1000) {
        this.sourceList = res.result;
      }
    })
    this.http.post('/common/parentIdentityList').then(res => {
      if (res.code == 1000) {
        this.parentIdentityList = res.result;
      }
    })
    this.http.post('/common/followStageList').then(res => {
      if (res.code == 1000) {
        this.followStageList = res.result;
      }
    })
    this.http.post('/common/showCommunityList').then(res => {
      if (res.code == 1000) {
        this.showCommunityList = res.result;
      }
    })
  }

  _customerFormInit(obj: any = {}) {
    this.customerForm = this.fb.group({
      // followStageId        : ['', [Validators.required]],                                                        // 跟进阶段
      nick                 : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],     // 宝宝昵称
      name                 : [''],                                                                               // 宝宝姓名
      sex                  : ['男'],                                                                             // 宝宝性别
      ethnic               : [''],                                                                               // 民族
      birthday             : [''],                                                                               // 宝宝生日
      constellation        : [''],                                                                               // 星座
      babyType             : [''],                                                                               // 宝宝类型
      communityId          : [''],                                                                               // 所属小区
      visitRemarks         : ['', [Validators.maxLength(300)]],                                                  // 备注

      parentName           : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],     // 家长姓名
      mobilePhone: ['', [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)], [this._parentPhoneAsyncValidator]],
      parentRelationShipId : ['', [Validators.required]],                                                        // 家长身份
      parentWeChat         : ['', [Validators.pattern(/^[A-Za-z0-9]{6,30}/)]],                                   // 家长QQ或者微信

      sourceId        : ['', [Validators.required]],                                                        // 来源
      recommendedId   : [''],                                                                               // 推荐人
      collectorId     : [''],                                                                               // 收集人
    });
    this.customerForm.get('birthday').valueChanges.subscribe( res => {
      this.customerForm.patchValue({
        constellation: res ? this._getAstro(this.format.transform(res, 'yyyy-MM-dd').split('-')[1], this.format.transform(res, 'yyyy-MM-dd').split('-')[2]) : '',
        babyType     : !res ? '' : this.monthDiff.transform(this.format.transform(res, 'yyyy-MM-dd')) > 10 ? '幼儿' : '婴儿'
      });
    });

    this.customerForm.get('nick').valueChanges.subscribe( res => {
      this.customerForm.patchValue({
        parentName: `${res}家长`
      });
    });
    this.customerForm.get('parentRelationShipId').valueChanges.subscribe(res => {
      this.parentIdentityList.map( item => {
        if (item.id == res) {
          this.customerForm.patchValue({
            parentName: this.customerForm.get('nick').value + item.name
          });
        }
      })
    })

  }  

  _submit(): void {
    if (this.customerForm.invalid) {
      for (let i in this.customerForm.controls) {
        this.customerForm.controls[i].markAsDirty();
      }
    } else {
      this._submitLoading = true;
      let params = this._id == '0' ? this.customerForm.value : Object.assign(this.customerForm.value, {id: this._id});
      if (params.birthday) { params.birthday = this.format.transform(params.birthday, 'yyyy-MM-dd')}
      this.http.post('/customer/modifyUserInfo', { paramJson: JSON.stringify(params) }).then( res => {
        this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
        if (res.code == 1000) {
          this.router.navigateByUrl('/home/customer/all');
        } else {
          this._submitLoading = false;
        }
      })
    }
  }

  getFormControl(name) {
    return this.customerForm.controls[name];
  }


  /* ----------------------- 新建小区 ----------------------- */
  _ceateHousingModal;
  housingName       : string;
  isConfirmLoading  : boolean = false;
  ceateHousing(title, content, footer): void {
    this._ceateHousingModal = this.modal.open({
      title: title,
      content: content,
      footer: footer
    });
  }
  submitHousing(): void {
    if (this.housingName.length && !this.isConfirmLoading) {
      this.isConfirmLoading = true;
      this.http.post(`/common/addCommunity`, { paramJson: JSON.stringify({name: this.housingName}) }).then( res => {
        this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
        if (res.code == 1000) {
          this._ceateHousingModal.destroy();
          this.showCommunityList.unshift(res.result)
        }
        this.isConfirmLoading = false;
      })
    }
  }

  /* ----------------------- 计算星座 ----------------------- */
  _getAstro(month?, day?): string {
    if (!month) { return ''; }
    var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2) + '座';
  }


  _parentPhoneAsyncValidator = (control: FormControl): any => {
    return Observable.create( observer => {
      this.http.post('/common/checkTelphoneNum', { paramJson: JSON.stringify({ mobilePhone: this.customerForm.get('mobilePhone').value }) }).then( res => {
        observer.next(res.result ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next(null);
        observer.complete();
      })
    })
  };

  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }
}

import { CityAddressService } from './../../../../relax/services/global-data/city-address.service';
import { HttpService } from './../../../../relax/services/http/http.service';
import { Component, OnInit, AfterContentChecked, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.scss']
})
export class StoreInfoComponent implements OnInit, AfterContentChecked {

  public formModel: FormGroup;

  public cityAddressItems: object[];

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private http: HttpService,
    private cityAddress: CityAddressService
  ) {
    /* ------------------ 获取省市区集合 ------------------ */
    cityAddress.getCityItems().then( res => {
      this.cityAddressItems = res;
    })
  }

  ngOnInit() {
    /* ------------------ 初始化表单模型 ------------------ */
    this.formModel = this.fb.group({
      coverImg: [],
      storeImg: [],

      shopName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],       // 门店名称
      publicCommentName: [],                                                                          // 大宗点评名称
      meituanName: [],                                                                                // 美团名称
      shopAddress: [],                                                                                // 详细地址
      cityAddress: [],                                                                                // 省市区
      facilitie: [],                                                                                  // 包含设施
      businessTime: [],                                                                               // 营业时间
      healthSafe: [],                                                                                 // 卫生安全
      warmPrompt: [],                                                                                 // 温馨提示
      trafficInformation: [],                                                                         // 交通信息
      parkingInformation: []                                                                          // 停车场信息
    })
  }


  /* ------------------ 监听表单变化,返回表单数据到父组件 ------------------ */
  @Output()
  private storeInfoChange: EventEmitter<object> = new EventEmitter();
  @Input()
  private storeInfo: object;
  private formModelValueString: string;
  ngAfterContentChecked() {
    if (JSON.stringify(this.formModel.value) !== this.formModelValueString) {
      this.formModelValueString = JSON.stringify(this.formModel.value);
      this.storeInfoChange.emit(this.formModel.value);
    }
  }


  /* ---------------- 获取模型表单字段 ---------------- */
  getFormControl(name) {
    return this.formModel.controls[name];
  }



  /* -------------------- 测试数据 -------------------- */
  resetForm():void {
    console.log(this.formModel.value)
  }
  fileList = [];
  fileList2 = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: -2,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: -3,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: -4,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: -5,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: -6,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ];
  previewImage = '';
  previewVisible = false;

  cityAddressChange = (value: any[]) => {
    console.log(value);
  }


  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  beforeUpload = (file, fileList): boolean => {
    console.log(file, fileList);
    return false;
  }
  
  facilitieItems = [
    { label: '家长休息期', value: '1' },
    { label: '寄存区', value: '2' },
    { label: '停车场', value: '3' },
    { label: '免费WIFI', value: '4' }
  ];
}

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

  constructor(
    private fb: FormBuilder = new FormBuilder()
  ) { }

  ngOnInit() {
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

  @Output()
  private storeInfoChange: EventEmitter<object> = new EventEmitter();
  @Input()
  private storeInfo: object;
  private formModelValueString: string;
  ngAfterContentChecked() {
    if (JSON.stringify(this.formModel.value) !== this.formModelValueString) {
      this.formModelValueString = JSON.stringify(this.formModel.value);
      this.storeInfoChange.emit(this.formModel.value);
      console.log(this.formModel.value)
    }
  }


  getFormControl(name) {
    return this.formModel.controls[name];
  }



  /* -------------------- 测试数据 -------------------- */
  resetForm():void {
    console.log(this.formModel.value)
  }
  public init_options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
        isLeaf: true
      }],
    }, {
      value: 'ningbo',
      label: 'Ningbo',
      isLeaf: true
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
        isLeaf: true
      }],
    }],
  }];
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

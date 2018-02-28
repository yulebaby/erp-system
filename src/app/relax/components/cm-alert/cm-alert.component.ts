import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cm-alert',
  templateUrl: './cm-alert.component.html',
  styleUrls: ['./cm-alert.component.scss']
})
export class CmAlertComponent {

  /**
   * @param       指定提示样式
   * @description 有四种选择 'success', 'info', 'warning', 'error'
   */
  @Input() type       : string = 'success';
           typeClass  : string;

  /**
   * @param       显示关闭按钮
   */
  @Input() showClose  : boolean;

  /**
   * @param       是否显示
   */
  @Input() isShow     : boolean = true;
  
  /**
   * @param       显示类型图标
   */
  @Input() showIcon   : boolean = true;

  /**
   * @param       关闭时触发回调
   */
  @Output() onClose: EventEmitter<any> = new EventEmitter();


  constructor() { }

  _close(): void {
    this.type = `${this.type} close`;
    this.onClose.emit();
    setTimeout(() => {
      this.isShow = false;
      this.type = this.type.replace(/ close/g, '');
    }, 250);
  }

}

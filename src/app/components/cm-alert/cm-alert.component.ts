import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cm-alert',
  templateUrl: './cm-alert.component.html',
  styleUrls: ['./cm-alert.component.scss']
})
export class CmAlertComponent implements OnInit {

  @Input() type         : string = 'success';
           typeClass    : string;

  @Input() showCloseBtn : boolean;
  
  @Input() showIcon     : boolean = true;

  constructor() { 
    
  }

  ngOnInit() {
  }

}

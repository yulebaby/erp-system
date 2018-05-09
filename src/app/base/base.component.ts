import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  public isCollapsed: boolean = false;

  themeColor: boolean | number;

  themeColorChange(e): void {
    this.themeColor = e;
    console.log(e)
  }

  constructor() { }

  ngOnInit() {
  }

}

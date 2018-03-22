import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  _checked = false;

  _handleChange(checked: boolean): void {
    this._checked = checked;
  }

}

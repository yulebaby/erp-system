import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-store-effect',
  templateUrl: './store-effect.component.html',
  styleUrls: ['./store-effect.component.scss']
})
export class StoreEffectComponent implements OnInit {

  @Input() storeInfo: object = {};

  array = [];

  constructor() { }

  ngOnInit() {
    setTimeout(_ => {
      this.array = [1, 2, 3, 4];
    }, 500);
  }

}

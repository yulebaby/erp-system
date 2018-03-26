import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cm-slide',
  templateUrl: './cm-slide.component.html',
  styleUrls: ['./cm-slide.component.scss']
})
export class CmSlideComponent implements OnInit {

  @Input() width: number = 960;

  constructor() { }

  ngOnInit() {
  }

}

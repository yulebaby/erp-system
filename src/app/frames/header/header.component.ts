import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() isCollapsedChange: EventEmitter<boolean> = new EventEmitter();

  @Input() isCollapsed: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  TapIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed)
    this.isCollapsedChange.emit(this.isCollapsed);
  }

}

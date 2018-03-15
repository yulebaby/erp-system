import { UserService } from './../../modules/user/user.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() isCollapsedChange: EventEmitter<boolean> = new EventEmitter();

  @Input() isCollapsed: boolean = false;
  
  user;

  constructor(
    private userService: UserService
  ) { 
    this.user = userService;
  }

  ngOnInit() {
  }

  TapIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed)
    this.isCollapsedChange.emit(this.isCollapsed);
  }

}

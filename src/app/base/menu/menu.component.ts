import { AppRouterService } from './../../app-router.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() isCollapsed: boolean = false;


  baseRouter
  constructor(
    private router : AppRouterService
  ) {
    this.baseRouter = router
  }

  ngOnInit() {
    console.log(this.baseRouter.toPath)
  }

}

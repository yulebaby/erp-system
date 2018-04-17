import { AppRouterService } from './../../core/app-router.service';
import { Component, OnInit, Input } from '@angular/core';
import { AppUserService } from '../../core/app-user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() isCollapsed: boolean = false;

  baseRouter;
  user;
  shopNameFontSize = 24;
  constructor(
    private router : AppRouterService,
    private userService: AppUserService
  ) {
    this.baseRouter = router;
    this.user = userService;
    this.shopNameFontSize = 160 / this.user.userInfo.store.shopName.length > 24 ? 24 : 160 / this.user.userInfo.store.shopName.length;
  }

  ngOnInit() {
  }

}

import { AppRouterService } from './../../core/app-router.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  /**
   * @public 面包屑
   */
  public breadcrumb: object[] = [];

  @Output() themeColor: EventEmitter<boolean | number> = new EventEmitter()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routerService: AppRouterService
  ) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        let routeData = [];
        while (route.firstChild) {
          route = route.firstChild;
          if (route.data['value']) {
            routeData.push(route.data['value']);
          }
        }
        return routeData;
      })
      .subscribe(event => {
        this.breadcrumb = event[0]['title'] ? event : [];
        this.themeColor.emit(this.breadcrumb.length);
      })
  }

  routerObj;
  ngOnInit() {
    this.routerObj = this.routerService;
  }

}

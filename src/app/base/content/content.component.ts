import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
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
        this.breadcrumb = event;
      })
  }

  ngOnInit() {
    
  }

}

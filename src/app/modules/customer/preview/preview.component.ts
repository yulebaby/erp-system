import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewCustomerComponent implements OnInit {

  constructor(
    private routeInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeInfo.params.subscribe( param => {
      console.log(param)
    })
  }

}

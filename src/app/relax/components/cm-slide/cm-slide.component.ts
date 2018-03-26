import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'cm-slide',
  templateUrl: './cm-slide.component.html',
  styleUrls: ['./cm-slide.component.scss']
})
export class CmSlideComponent implements OnInit {

  @Input() width: number = 960;

  @Input() template: any; 


  constructor(private _viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    setTimeout(() => {
      if (this.template) {
        console.log(this.template)
        this._viewContainerRef.createEmbeddedView(this.template);

      }
      
    }, 1000);
  }

}

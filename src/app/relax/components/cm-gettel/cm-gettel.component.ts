import { HttpService } from './../../services/http/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cm-gettel',
  templateUrl: './cm-gettel.component.html',
  styleUrls: ['./cm-gettel.component.scss']
})
export class CmGettelComponent {

  @Input() id: string | number;  

  telPhone: string;

  constructor(
    private http: HttpService
  ) { }

  getTelPhone(): void {
    if (!this.telPhone) {
      let id = typeof this.id === 'number' ? this.id.toString() : this.id;
      this.http.post('/common/lookParentTelphone', { paramJson: JSON.stringify({ id }) }).then(res => {
        if (res.code == 1000) {
          this.telPhone = res.result.mobilePhone
        }
      })
    }
  }

}

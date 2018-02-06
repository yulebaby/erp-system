import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllCustomerComponent implements OnInit {

  queryForm: FormGroup;

  constructor(
    private fb: FormBuilder = new FormBuilder()
  ) { }

  ngOnInit() {
    this.queryForm = this.fb.group({
      babyName: [],
      status: [],
      source: [],
      name: [],
      phone: [],
      sex: [],
      birthdayStart: [],
      birthdayEnd: [],
      createStart: [],
      createEnd: []
    })
  }

  _queryForm():void {
    console.log(1)
  }

}

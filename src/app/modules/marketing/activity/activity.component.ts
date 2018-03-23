import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  /* -------- 查询条件 场景/节日集合 -------- */
  queryForm = {
    name,
    scene: [],
    festival: []
  };
  sceneItems = [
    { name: '开业促销', id: 1 },
    { name: '周年庆', id: 2 },
    { name: '大甩卖', id: 3 }
  ];
  festivalItems = [
    { name: '春节', id: 1 },
    { name: '劳动节', id: 2 },
    { name: '儿童节', id: 3 },
    { name: '中秋节', id: 4 },
    { name: '国庆节', id: 5 },
    { name: '元旦', id: 6 },
    { name: '圣诞节', id: 7 },
    { name: '元宵', id: 8 }
  ];

  constructor() { }

  ngOnInit() {
  }

  /* --------------------- 选择查询条件 --------------------- */
  queryCheckChange(checked: boolean, control: string, id) {
    if (checked) {
      this.queryForm[control].push(id);
    } else {
      this.queryForm[control].splice(this.queryForm[control].indexOf(id), 1);
    }
  }

  /* --------------------- 点击搜索 --------------------- */
  searchSubmit(): void {
    let params = JSON.parse(JSON.stringify(this.queryForm));
    params.scene = params.scene.join(',');
    params.festival = params.festival.join(',');
    console.log(params)
  }

}

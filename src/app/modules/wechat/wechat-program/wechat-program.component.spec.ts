import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatProgramComponent } from './wechat-program.component';

describe('WechatProgramComponent', () => {
  let component: WechatProgramComponent;
  let fixture: ComponentFixture<WechatProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmAlertComponent } from './cm-alert.component';

describe('CmAlertComponent', () => {
  let component: CmAlertComponent;
  let fixture: ComponentFixture<CmAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

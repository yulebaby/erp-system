import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmQueryComponent } from './cm-query.component';

describe('CmQueryComponent', () => {
  let component: CmQueryComponent;
  let fixture: ComponentFixture<CmQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

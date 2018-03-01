import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTableComponent } from './cm-table.component';

describe('CmTableComponent', () => {
  let component: CmTableComponent;
  let fixture: ComponentFixture<CmTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

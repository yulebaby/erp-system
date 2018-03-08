import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmQuoteComponent } from './cm-quote.component';

describe('CmQuoteComponent', () => {
  let component: CmQuoteComponent;
  let fixture: ComponentFixture<CmQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

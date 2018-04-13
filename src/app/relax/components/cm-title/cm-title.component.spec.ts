import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTitleComponent } from './cm-title.component';

describe('CmTitleComponent', () => {
  let component: CmTitleComponent;
  let fixture: ComponentFixture<CmTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmGettelComponent } from './cm-gettel.component';

describe('CmGettelComponent', () => {
  let component: CmGettelComponent;
  let fixture: ComponentFixture<CmGettelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmGettelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmGettelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

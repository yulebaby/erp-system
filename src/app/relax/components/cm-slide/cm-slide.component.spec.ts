import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSlideComponent } from './cm-slide.component';

describe('CmSlideComponent', () => {
  let component: CmSlideComponent;
  let fixture: ComponentFixture<CmSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

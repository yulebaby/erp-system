import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NointentionComponent } from './nointention.component';

describe('NointentionComponent', () => {
  let component: NointentionComponent;
  let fixture: ComponentFixture<NointentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NointentionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NointentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

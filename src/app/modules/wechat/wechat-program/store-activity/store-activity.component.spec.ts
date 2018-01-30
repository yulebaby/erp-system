import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreActivityComponent } from './store-activity.component';

describe('StoreActivityComponent', () => {
  let component: StoreActivityComponent;
  let fixture: ComponentFixture<StoreActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

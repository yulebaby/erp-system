import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEffectComponent } from './store-effect.component';

describe('StoreEffectComponent', () => {
  let component: StoreEffectComponent;
  let fixture: ComponentFixture<StoreEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSeaPoolComponent } from './public-sea-pool.component';

describe('PublicSeaPoolComponent', () => {
  let component: PublicSeaPoolComponent;
  let fixture: ComponentFixture<PublicSeaPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicSeaPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSeaPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcExpressSellComponent } from './sell.component';

describe('OtcExpressSellComponent', () => {
  let component: OtcExpressSellComponent;
  let fixture: ComponentFixture<OtcExpressSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtcExpressSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcExpressSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

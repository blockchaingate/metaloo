import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcExpressBuyComponent } from './buy.component';

describe('OtcExpressBuyComponent', () => {
  let component: OtcExpressBuyComponent;
  let fixture: ComponentFixture<OtcExpressBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtcExpressBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcExpressBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

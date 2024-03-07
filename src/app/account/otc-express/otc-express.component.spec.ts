import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcExpressComponent } from './otc-express.component';

describe('OtcExpressComponent', () => {
  let component: OtcExpressComponent;
  let fixture: ComponentFixture<OtcExpressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtcExpressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcExpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

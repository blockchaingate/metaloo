import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDigitIdComponent } from './payment-digit-id.component';

describe('PaymentDigitIdComponent', () => {
  let component: PaymentDigitIdComponent;
  let fixture: ComponentFixture<PaymentDigitIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDigitIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDigitIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

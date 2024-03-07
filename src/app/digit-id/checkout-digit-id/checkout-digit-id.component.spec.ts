import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDigitIdComponent } from './checkout-digit-id.component';

describe('CheckoutDigitIdComponent', () => {
  let component: CheckoutDigitIdComponent;
  let fixture: ComponentFixture<CheckoutDigitIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutDigitIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutDigitIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

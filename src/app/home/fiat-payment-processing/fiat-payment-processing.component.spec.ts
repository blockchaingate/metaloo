import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiatPaymentProcessingComponent } from './fiat-payment-processing.component';

describe('FiatPaymentProcessingComponent', () => {
  let component: FiatPaymentProcessingComponent;
  let fixture: ComponentFixture<FiatPaymentProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiatPaymentProcessingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiatPaymentProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

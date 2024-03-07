import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDueDiligenceComponent } from './customer-due-diligence.component';

describe('CustomerDueDiligenceComponent', () => {
  let component: CustomerDueDiligenceComponent;
  let fixture: ComponentFixture<CustomerDueDiligenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDueDiligenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDueDiligenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

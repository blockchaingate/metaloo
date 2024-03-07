import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofOfAddressComponent } from './proof-of-address.component';

describe('ProofOfAddressComponent', () => {
  let component: ProofOfAddressComponent;
  let fixture: ComponentFixture<ProofOfAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofOfAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofOfAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

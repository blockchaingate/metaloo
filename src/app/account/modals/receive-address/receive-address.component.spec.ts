import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveAddressComponent } from './receive-address.component';

describe('ReceiveAddressComponent', () => {
  let component: ReceiveAddressComponent;
  let fixture: ComponentFixture<ReceiveAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

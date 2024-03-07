import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupWalletComponent } from './signup-wallet.component';

describe('SignupWalletComponent', () => {
  let component: SignupWalletComponent;
  let fixture: ComponentFixture<SignupWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipKycComponent } from './skip-kyc.component';

describe('SkipKycComponent', () => {
  let component: SkipKycComponent;
  let fixture: ComponentFixture<SkipKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkipKycComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkipKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

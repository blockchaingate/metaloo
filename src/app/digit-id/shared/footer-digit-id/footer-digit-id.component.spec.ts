import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDigitIdComponent } from './footer-digit-id.component';

describe('FooterDigitIdComponent', () => {
  let component: FooterDigitIdComponent;
  let fixture: ComponentFixture<FooterDigitIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterDigitIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterDigitIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

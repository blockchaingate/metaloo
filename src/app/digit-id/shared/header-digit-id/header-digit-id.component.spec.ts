import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDigitIdComponent } from './header-digit-id.component';

describe('HeaderDigitIdComponent', () => {
  let component: HeaderDigitIdComponent;
  let fixture: ComponentFixture<HeaderDigitIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDigitIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDigitIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

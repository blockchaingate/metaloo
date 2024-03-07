import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitIdComponent } from './digit-id.component';

describe('DigitIdComponent', () => {
  let component: DigitIdComponent;
  let fixture: ComponentFixture<DigitIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

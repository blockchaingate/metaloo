import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDigitIdComponent } from './index-digit-id.component';

describe('IndexDigitIdComponent', () => {
  let component: IndexDigitIdComponent;
  let fixture: ComponentFixture<IndexDigitIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDigitIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexDigitIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

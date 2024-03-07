import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashappComponent } from './cashapp.component';

describe('CashappComponent', () => {
  let component: CashappComponent;
  let fixture: ComponentFixture<CashappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

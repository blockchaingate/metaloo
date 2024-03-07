import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashAppComponent } from './cash-app.component';

describe('CashAppComponent', () => {
  let component: CashAppComponent;
  let fixture: ComponentFixture<CashAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

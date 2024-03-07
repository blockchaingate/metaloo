import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawsTableComponent } from './withdraws-table.component';

describe('WithdrawsTableComponent', () => {
  let component: WithdrawsTableComponent;
  let fixture: ComponentFixture<WithdrawsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

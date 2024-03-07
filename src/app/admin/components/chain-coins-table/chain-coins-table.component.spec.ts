import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainCoinsTableComponent } from './chain-coins-table.component';

describe('ChainCoinsTableComponent', () => {
  let component: ChainCoinsTableComponent;
  let fixture: ComponentFixture<ChainCoinsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainCoinsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChainCoinsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

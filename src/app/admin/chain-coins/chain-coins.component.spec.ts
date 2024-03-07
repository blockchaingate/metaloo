import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainCoinsComponent } from './chain-coins.component';

describe('ChainCoinsComponent', () => {
  let component: ChainCoinsComponent;
  let fixture: ComponentFixture<ChainCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainCoinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChainCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

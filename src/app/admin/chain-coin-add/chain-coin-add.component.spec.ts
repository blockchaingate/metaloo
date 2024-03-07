import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainCoinAddComponent } from './chain-coin-add.component';

describe('ChainCoinAddComponent', () => {
  let component: ChainCoinAddComponent;
  let fixture: ComponentFixture<ChainCoinAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainCoinAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChainCoinAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

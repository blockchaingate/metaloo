import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinAddComponent } from './coin-add.component';

describe('CoinAddComponent', () => {
  let component: CoinAddComponent;
  let fixture: ComponentFixture<CoinAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

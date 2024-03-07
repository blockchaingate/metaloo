import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsTableComponent } from './wallets-table.component';

describe('WalletsTableComponent', () => {
  let component: WalletsTableComponent;
  let fixture: ComponentFixture<WalletsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondAssetsComponent } from './bond-assets.component';

describe('BondAssetsComponent', () => {
  let component: BondAssetsComponent;
  let fixture: ComponentFixture<BondAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondAssetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BondAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

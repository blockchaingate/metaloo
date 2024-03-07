import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainsTableComponent } from './chains-table.component';

describe('ChainsTableComponent', () => {
  let component: ChainsTableComponent;
  let fixture: ComponentFixture<ChainsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChainsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

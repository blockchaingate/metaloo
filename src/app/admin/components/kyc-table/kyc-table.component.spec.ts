import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycTableComponent } from './kyc-table.component';

describe('KycTableComponent', () => {
  let component: KycTableComponent;
  let fixture: ComponentFixture<KycTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

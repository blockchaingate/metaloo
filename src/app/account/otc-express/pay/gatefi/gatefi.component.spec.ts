import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatefiComponent } from './gatefi.component';

describe('GatefiComponent', () => {
  let component: GatefiComponent;
  let fixture: ComponentFixture<GatefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatefiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcP2pComponent } from './otc-p2p.component';

describe('OtcP2pComponent', () => {
  let component: OtcP2pComponent;
  let fixture: ComponentFixture<OtcP2pComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtcP2pComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcP2pComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

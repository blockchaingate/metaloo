import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendReceiveComponent } from './send-receive.component';

describe('SendReceiveComponent', () => {
  let component: SendReceiveComponent;
  let fixture: ComponentFixture<SendReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

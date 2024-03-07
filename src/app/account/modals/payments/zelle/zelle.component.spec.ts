import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZelleComponent } from './zelle.component';

describe('ZelleComponent', () => {
  let component: ZelleComponent;
  let fixture: ComponentFixture<ZelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
